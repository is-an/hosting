(function () {
  const fileInput = document.getElementById('shutterFile');
  const dropZone = document.getElementById('shutterDropZone');
  const status = document.getElementById('shutterStatus');
  const previewWrap = document.getElementById('shutterPreviewWrap');
  const preview = document.getElementById('shutterPreview');
  const result = document.getElementById('shutterResult');
  const actions = document.getElementById('shutterActions');
  let previewUrl = null;
  let latestInfo = null;

  const tags = { 0x0100: 'width', 0x0101: 'height', 0x010F: 'make', 0x0110: 'model', 0x0132: 'date', 0x8769: 'exifOffset', 0x8825: 'gpsOffset', 0x9003: 'dateOriginal', 0x829A: 'exposure', 0x829D: 'aperture', 0x8827: 'iso', 0x920A: 'focalLength', 0x927C: 'makerNote', 0xA002: 'pixelWidth', 0xA003: 'pixelHeight', 0xA434: 'lens' };
  const typeSizes = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

  function t(key, fallback) { return typeof translate === 'function' ? translate(key, getCurrentLanguage()) : fallback; }
  function unknown() { return t('shutter_unknown', '확인할 수 없음'); }
  function cleanText(value) { return String(value || '').replace(/[\u0000-\u001f<>]/g, '').trim(); }
  function readAscii(view, offset, length) { let value = ''; for (let index = 0; index < length && offset + index < view.byteLength; index++) { const code = view.getUint8(offset + index); if (!code) break; value += String.fromCharCode(code); } return cleanText(value); }
  function fraction(value) { return value && value[1] ? value[0] / value[1] : null; }
  function formatFraction(value) { if (!value) return unknown(); return value[0] === 1 ? '1/' + value[1] + ' s' : (value[0] / value[1]).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + ' s'; }
  function formatNumber(value) { return Number.isFinite(value) ? Math.round(value).toLocaleString() : unknown(); }

  function findTiff(buffer) {
    const view = new DataView(buffer);
    if (view.byteLength < 8) return null;
    if ((view.getUint8(0) === 0x49 && view.getUint8(1) === 0x49) || (view.getUint8(0) === 0x4D && view.getUint8(1) === 0x4D)) return { view: view, start: 0 };
    if (view.getUint16(0) !== 0xFFD8) return null;
    let offset = 2;
    while (offset + 4 <= view.byteLength) {
      if (view.getUint8(offset) !== 0xFF) break;
      const marker = view.getUint8(offset + 1); const length = view.getUint16(offset + 2);
      if (marker === 0xE1 && length >= 10 && readAscii(view, offset + 4, 6) === 'Exif') return { view: view, start: offset + 10 };
      if (length < 2) break; offset += length + 2;
    }
    return null;
  }

  function parseExif(buffer) {
    const source = findTiff(buffer); if (!source) throw new Error('NO_EXIF');
    const view = source.view, start = source.start;
    if (start + 8 > view.byteLength) throw new Error('NO_EXIF');
    const little = view.getUint16(start) === 0x4949;
    if (!little && view.getUint16(start) !== 0x4D4D) throw new Error('NO_EXIF');
    const read16 = offset => view.getUint16(offset, little), read32 = offset => view.getUint32(offset, little);
    if (read16(start + 2) !== 42) throw new Error('NO_EXIF');
    const info = { makerTags: [] };
    function valueAt(entry, type, count) {
      const size = typeSizes[type]; if (!size || count * size > 65536) return null;
      const location = count * size <= 4 ? entry + 8 : start + read32(entry + 8);
      if (location < 0 || location + count * size > view.byteLength) return null;
      if (type === 2) return readAscii(view, location, count);
      if (type === 3) return read16(location);
      if (type === 4) return read32(location);
      if (type === 9) return view.getInt32(location, little);
      if (type === 5 || type === 10) return [read32(location), read32(location + 4)];
      if (type === 1 || type === 7) return { offset: location, length: count };
      return null;
    }
    function readIfd(offset, kind) {
      if (!offset || start + offset + 2 > view.byteLength) return;
      const directory = start + offset, count = read16(directory);
      for (let index = 0; index < count; index++) {
        const entry = directory + 2 + index * 12; if (entry + 12 > view.byteLength) break;
        const tag = read16(entry), type = read16(entry + 2), itemCount = read32(entry + 4), value = valueAt(entry, type, itemCount);
        if (kind === 'maker') info.makerTags.push({ tag: tag, type: type, count: itemCount, value: value });
        else if (tags[tag]) info[tags[tag]] = value;
      }
    }
    readIfd(read32(start + 4), 'main');
    if (typeof info.exifOffset === 'number') readIfd(info.exifOffset, 'exif');
    if (info.makerNote && info.makerNote.offset) parseMakerNote(view, info.makerNote, little, info);
    return info;
  }

  function parseMakerNote(view, note, little, info) {
    const start = note.offset, signature = readAscii(view, start, Math.min(note.length, 12));
    let offset = start;
    if (signature.indexOf('FUJIFILM') === 0) { offset += 12; little = false; }
    else if (signature.indexOf('SONY') === 0) { offset += 12; }
    else if (signature.indexOf('Panasonic') === 0) { offset += 12; }
    if (offset + 2 > view.byteLength) return;
    const get16 = pos => view.getUint16(pos, little), get32 = pos => view.getUint32(pos, little);
    const count = get16(offset);
    for (let index = 0; index < count; index++) {
      const entry = offset + 2 + index * 12; if (entry + 12 > view.byteLength) break;
      const tag = get16(entry), type = get16(entry + 2), itemCount = get32(entry + 4);
      let value = null;
      if ((type === 3 || type === 4) && itemCount === 1) value = type === 3 ? get16(entry + 8) : get32(entry + 8);
      info.makerTags.push({ tag: tag, type: type, count: itemCount, value: value });
    }
  }

  function explicitTag(tagsList, candidates) { const found = tagsList.find(item => candidates.indexOf(item.tag) !== -1 && Number.isInteger(item.value) && item.value > 0); return found ? found.value : null; }
  function parseSony(info) { return explicitTag(info.makerTags, [0xB001]); }
  function parseFujifilm(info) { return explicitTag(info.makerTags, [0x1438]); }
  function parseCanon(info) { return explicitTag(info.makerTags, [0x00A9]); }
  function parsePanasonic(info) { return explicitTag(info.makerTags, [0x002E]); }
  function parseLeica(info) { return explicitTag(info.makerTags, [0x0300]); }
  function parseShutterCount(info) {
    const make = cleanText(info.make).toLowerCase();
    if (make.indexOf('sony') !== -1) return { supported: true, count: parseSony(info) };
    if (make.indexOf('fujifilm') !== -1 || make.indexOf('fuji') !== -1) return { supported: true, count: parseFujifilm(info) };
    if (make.indexOf('canon') !== -1) return { supported: true, count: parseCanon(info) };
    if (make.indexOf('panasonic') !== -1) return { supported: true, count: parsePanasonic(info) };
    if (make.indexOf('leica') !== -1) return { supported: true, count: parseLeica(info) };
    return { supported: false, count: null };
  }

  function line(label, value) { const row = document.createElement('div'); row.className = 'shutter-row'; const name = document.createElement('span'); name.textContent = label; const detail = document.createElement('strong'); detail.textContent = value || unknown(); row.append(name, detail); return row; }
  function showResult(info, file) {
    latestInfo = info; const shutter = parseShutterCount(info); result.replaceChildren();
    const title = document.createElement('h2'); title.textContent = '📷 ' + t('shutter_cameraInfo', '카메라 정보'); result.appendChild(title);
    const countBox = document.createElement('div'); countBox.className = 'shutter-count-box'; const countTitle = document.createElement('span'); countTitle.textContent = t('shutter_count', '셔터카운트'); const countValue = document.createElement('b'); countValue.textContent = shutter.count ? formatNumber(shutter.count) : unknown(); const countStatus = document.createElement('p'); countStatus.textContent = shutter.count ? t('shutter_confirmed', '🟢 사진 EXIF에서 확인된 값입니다.') : (shutter.supported ? t('shutter_missing', '🟡 카메라는 확인했지만 이 사진에 셔터카운트 정보가 없습니다.') : t('shutter_unsupported', '🔴 지원 제조사 여부를 확인할 수 없으며 셔터카운트 정보도 없습니다.')); countBox.append(countTitle, countValue, countStatus); result.appendChild(countBox);
    const grid = document.createElement('div'); grid.className = 'shutter-grid'; const exposure = Array.isArray(info.exposure) ? formatFraction(info.exposure) : unknown(); const aperture = fraction(info.aperture); const focal = fraction(info.focalLength); const width = info.pixelWidth || info.width; const height = info.pixelHeight || info.height; [[t('shutter_make', '제조사'), cleanText(info.make) || unknown()], [t('shutter_model', '모델'), cleanText(info.model) || unknown()], [t('shutter_date', '촬영일시'), cleanText(info.dateOriginal || info.date) || unknown()], [t('shutter_lens', '렌즈'), cleanText(info.lens) || unknown()], ['ISO', info.iso ? String(info.iso) : unknown()], [t('shutter_speed', '셔터스피드'), exposure], [t('shutter_aperture', '조리개'), aperture ? 'f/' + aperture.toFixed(1) : unknown()], [t('shutter_focal', '초점거리'), focal ? focal.toFixed(1).replace(/\.0$/, '') + ' mm' : unknown()], [t('shutter_file', '파일 형식'), (file.type || file.name.split('.').pop() || '').toUpperCase()], [t('shutter_size', '이미지 크기'), width && height ? width + ' × ' + height : unknown()]].forEach(item => grid.appendChild(line(item[0], item[1]))); result.appendChild(grid); result.classList.remove('hidden'); actions.classList.remove('hidden');
  }
  function showError(key) { result.textContent = t(key, 'EXIF 정보를 확인할 수 없습니다.'); result.classList.remove('hidden'); actions.classList.add('hidden'); }
  async function handleFile(file) {
    if (!file) return; reset(false); status.textContent = t('shutter_reading', '사진 정보를 분석하는 중입니다...');
    if (file.type.indexOf('image/') === 0) { previewUrl = URL.createObjectURL(file); preview.src = previewUrl; previewWrap.classList.remove('hidden'); }
    try { const info = parseExif(await file.arrayBuffer()); showResult(info, file); status.textContent = t('shutter_complete', '분석이 완료되었습니다.'); } catch (error) { showError(error.message === 'NO_EXIF' ? 'shutter_noExif' : 'shutter_error'); status.textContent = t('shutter_noExif', '이 파일에서 읽을 수 있는 EXIF 정보를 찾지 못했습니다.'); }
  }
  function reset(clearInput) { if (previewUrl) URL.revokeObjectURL(previewUrl); previewUrl = null; preview.removeAttribute('src'); previewWrap.classList.add('hidden'); result.replaceChildren(); result.classList.add('hidden'); actions.classList.add('hidden'); latestInfo = null; if (clearInput) fileInput.value = ''; }
  fileInput.addEventListener('change', event => handleFile(event.target.files[0]));
  ['dragenter', 'dragover'].forEach(eventName => dropZone.addEventListener(eventName, event => { event.preventDefault(); dropZone.classList.add('dragging'); }));
  ['dragleave', 'drop'].forEach(eventName => dropZone.addEventListener(eventName, event => { event.preventDefault(); dropZone.classList.remove('dragging'); }));
  dropZone.addEventListener('drop', event => handleFile(event.dataTransfer.files[0])); dropZone.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') fileInput.click(); });
  document.getElementById('shutterRemove').addEventListener('click', () => { reset(true); status.textContent = t('shutter_ready', '사진은 이 기기에서만 분석되며 서버로 전송되지 않습니다.'); }); document.getElementById('shutterAgain').addEventListener('click', () => fileInput.click()); document.getElementById('shutterCopy').addEventListener('click', () => copyGameLink(window.location.href, { container: result })); document.getElementById('shutterShare').addEventListener('click', () => { if (!latestInfo) return; const shutter = parseShutterCount(latestInfo); const camera = cleanText(latestInfo.make) + ' ' + cleanText(latestInfo.model); const detail = shutter.count ? t('shutter_count', '셔터카운트') + ': ' + formatNumber(shutter.count) : t('shutter_missingShort', '셔터카운트: 확인할 수 없음'); shareGameResult({ title: document.title, text: '📷 ' + t('shutter_shareTitle', '카메라 셔터카운트 확인 결과') + '\n\n' + camera.trim() + '\n' + detail, container: result }); });
})();