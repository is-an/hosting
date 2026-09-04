/* =========================================================
   saju-view.js — 사주팔자 계산 + 결과 렌더
   ---------------------------------------------------------
   계산 규칙
     연주: 입춘(2월 4일) 이전 출생은 전년도로 계산
     월주: 월지는 인월(2월)부터, 월간은 오호둔(五虎遁)
     일주: 1984-02-02 갑자일 기준 일수 나머지
     시주: 오자둔(五子遁), 23~01시는 자시
   ▸ 저장소에 기존 사주 계산 로직이 있으면 buildSaju() 만 교체하고
     반환 형식(stems/branches 인덱스)을 맞추면 됩니다.
   ========================================================= */

(function () {
  var STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  var BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];
  var STEM_EL = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  var BRANCH_EL = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
  var EL = [
    { name: '목(木)', trait: '성장, 뻗어 나감', color: '#6fae7c' },
    { name: '화(火)', trait: '열정, 확산',      color: '#d1795f' },
    { name: '토(土)', trait: '안정, 중재',      color: '#c2a166' },
    { name: '금(金)', trait: '결단, 정리',      color: '#9fa7b3' },
    { name: '수(水)', trait: '지혜, 유연함',    color: '#6f92c4' }
  ];

  function pad(n) { return String(n).padStart(2, '0'); }

  var el = {
    date: document.getElementById('birthDate'),
    time: document.getElementById('birthTime'),
    gender: document.getElementById('gender'),
    btn: document.getElementById('sajuBtn'),
    result: document.getElementById('sajuResult'),
    meta: document.getElementById('sajuMeta'),
    pillars: document.getElementById('pillars'),
    elements: document.getElementById('elements'),
    dayLabel: document.getElementById('dayStemLabel'),
    dayCopy: document.getElementById('dayStemCopy'),
    copy: document.getElementById('copyBtn'),
    share: document.getElementById('shareBtn')
  };
  if (!el.date) { return; }

  var current = null;

  function fillHours() {
    var opts = ['<option value="">모름</option>'];
    for (var i = 0; i < 24; i++) {
      var v = pad(i);
      opts.push('<option value="' + v + '"' + (v === '09' ? ' selected' : '') + '>' + v + ':00</option>');
    }
    el.time.innerHTML = opts.join('');
  }

  function buildSaju(dateStr, timeStr) {
    var p = dateStr.split('-').map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    if (isNaN(d.getTime())) { return null; }

    /* 연주 — 입춘 이전은 전년도 */
    var y = d.getFullYear();
    if (d.getMonth() < 1 || (d.getMonth() === 1 && d.getDate() < 4)) { y -= 1; }
    var yStem = ((y - 4) % 10 + 10) % 10;
    var yBranch = ((y - 4) % 12 + 12) % 12;

    /* 월주 */
    var mBranch = p[1] % 12;
    var order = (mBranch - 2 + 12) % 12;
    var mStem = ((yStem % 5) * 2 + order + 2) % 10;

    /* 일주 — 1984-02-02 갑자일 */
    var days = Math.round((Date.UTC(p[0], p[1] - 1, p[2]) - Date.UTC(1984, 1, 2)) / 86400000);
    var dStem = ((days % 10) + 10) % 10;
    var dBranch = ((days % 12) + 12) % 12;

    /* 시주 */
    var hour = null, hStem = null, hBranch = null;
    if (timeStr !== '') {
      hour = Number(timeStr);
      hBranch = Math.floor(((hour + 1) % 24) / 2);
      hStem = ((dStem % 5) * 2 + hBranch) % 10;
    }

    return {
      year: y, hour: hour,
      pillars: [
        { label: '연주 年', stem: yStem, branch: yBranch, reading: '뿌리·환경' },
        { label: '월주 月', stem: mStem, branch: mBranch, reading: '성장기·사회' },
        { label: '일주 日', stem: dStem, branch: dBranch, reading: '자기 자신' },
        { label: '시주 時', stem: hStem, branch: hBranch, reading: hour === null ? '출생시간 미입력' : '말년·결실' }
      ]
    };
  }

  function renderPillars(saju) {
    el.pillars.innerHTML = saju.pillars.map(function (p) {
      var stem = p.stem === null ? '—' : STEMS[p.stem];
      var branch = p.branch === null ? '—' : BRANCHES[p.branch];
      var stemColor = p.stem === null ? 'var(--v2-ink-muted)' : EL[STEM_EL[p.stem]].color;
      var branchColor = p.branch === null ? 'var(--v2-ink-muted)' : EL[BRANCH_EL[p.branch]].color;
      return '<div class="v2-pillar">' +
        '<p class="v2-pillar-label">' + p.label + '</p>' +
        '<div class="v2-pillar-char" style="color:' + stemColor + '">' + stem + '</div>' +
        '<div class="v2-pillar-char" style="color:' + branchColor + '">' + branch + '</div>' +
        '<p class="v2-pillar-reading">' + p.reading + '</p>' +
      '</div>';
    }).join('');
  }

  function renderElements(saju) {
    var counts = [0, 0, 0, 0, 0];
    saju.pillars.forEach(function (p) {
      if (p.stem !== null) { counts[STEM_EL[p.stem]]++; }
      if (p.branch !== null) { counts[BRANCH_EL[p.branch]]++; }
    });
    var total = counts.reduce(function (a, b) { return a + b; }, 0) || 1;

    el.elements.innerHTML = EL.map(function (e, i) {
      var w = Math.round((counts[i] / total) * 100);
      return '<div class="v2-element-row">' +
        '<span class="v2-element-name">' + e.name + '</span>' +
        '<span class="v2-element-track"><span class="v2-element-bar" style="width:' + w + '%;background:' + e.color + '"></span></span>' +
        '<span class="v2-element-count">' + counts[i] + '</span>' +
        '<span class="v2-element-trait">' + e.trait + '</span>' +
      '</div>';
    }).join('');
  }

  function calculate() {
    if (!el.date.value) { el.result.hidden = true; current = null; return; }
    var saju = buildSaju(el.date.value, el.time.value);
    if (!saju) { el.result.hidden = true; current = null; return; }

    renderPillars(saju);
    renderElements(saju);

    var dayStem = saju.pillars[2].stem;
    var de = EL[STEM_EL[dayStem]];
    el.dayLabel.textContent = '일간 ' + STEMS[dayStem] + BRANCHES[saju.pillars[2].branch] + ' · ' + de.name;
    el.dayCopy.textContent = '태어난 날의 천간(일간)이 ' + STEMS[dayStem] + '으로 ' + de.name +
      '에 속합니다. ' + de.trait + '의 기운을 중심으로 보며, 나머지 일곱 글자와의 관계에 따라 실제 해석은 달라집니다.';

    el.meta.textContent = saju.year + '년 기준 · ' +
      (el.gender.value === 'male' ? '남성' : '여성') +
      (saju.hour === null ? ' · 시주 제외' : ' · ' + pad(saju.hour) + ':00');

    current = saju;
    el.result.hidden = false;
    el.copy.textContent = '결과 복사';
    el.share.textContent = '링크 공유';
  }

  el.btn.addEventListener('click', calculate);

  el.copy.addEventListener('click', function () {
    if (!current) { return; }
    var text = '사주팔자 · ' + current.pillars.map(function (p) {
      return (p.stem === null ? '—' : STEMS[p.stem]) + (p.branch === null ? '—' : BRANCHES[p.branch]);
    }).join(' ') + ' (일간 ' + STEMS[current.pillars[2].stem] + ')';
    try { navigator.clipboard.writeText(text); } catch (e) {}
    el.copy.textContent = '복사됨';
  });

  el.share.addEventListener('click', function () {
    var url = window.location.origin + window.location.pathname +
      '?d=' + el.date.value + (el.time.value ? '&t=' + el.time.value : '');
    if (navigator.share) {
      try { navigator.share({ title: '무료 사주팔자 풀이', url: url }); } catch (e) {}
    } else {
      try { navigator.clipboard.writeText(url); } catch (e) {}
    }
    el.share.textContent = '링크 복사됨';
  });

  /* 초기화 */
  fillHours();

  var params = new URLSearchParams(window.location.search);
  var d = params.get('d');
  var t = params.get('t');
  if (/^\d{4}-\d{2}-\d{2}$/.test(d || '')) { el.date.value = d; }
  if (/^\d{2}$/.test(t || '')) { el.time.value = t; }

  calculate();

  if (typeof renderRelatedTools === 'function') {
    renderRelatedTools('relatedList', ['age', 'dday', 'lotto', 'discharge']);
  }
})();
