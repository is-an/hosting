(function () {
  const pad = document.getElementById('reactionPad');
  const message = document.getElementById('reactionMessage');
  const startButton = document.getElementById('reactionStart');
  const result = document.getElementById('reactionResult');
  const best = document.getElementById('reactionBest');
  const averageMode = document.getElementById('averageMode');
  const shareButton = document.getElementById('reactionShare');
  const copyButton = document.getElementById('reactionCopy');
  let state = 'idle';
  let timer = null;
  let startedAt = 0;
  let lastRecord = null;
  let rounds = [];

  function text(key, fallback) { return typeof translate === 'function' ? translate(key, getCurrentLanguage()) : fallback; }
  function readBest() { try { return Number(localStorage.getItem('reactionBest')) || 0; } catch (e) { return 0; } }
  function setBest(value) { try { localStorage.setItem('reactionBest', String(value)); } catch (e) {} }
  function renderBest() { const value = readBest(); best.textContent = value ? value + ' ms' : '-'; }
  function rating(value) {
    if (value < 200) return '매우 빠릅니다!';
    if (value < 300) return '빠른 편입니다!';
    if (value < 400) return '평균적인 반응속도입니다.';
    return '조금 더 연습해보세요.';
  }
  function resetPad() { clearTimeout(timer); state = 'idle'; pad.className = 'reaction-pad'; message.textContent = '시작 버튼을 눌러 준비하세요.'; startButton.disabled = false; }
  function begin() {
    clearTimeout(timer); result.classList.add('hidden'); state = 'waiting';
    pad.className = 'reaction-pad waiting'; message.textContent = '준비... 화면이 바뀌기 전에는 누르지 마세요.'; startButton.disabled = true;
    timer = setTimeout(() => { state = 'ready'; startedAt = performance.now(); pad.className = 'reaction-pad ready'; message.textContent = '지금 누르세요!'; }, 1000 + Math.random() * 4000);
  }
  function showRecord(value) {
    let newBest = false;
    if (!readBest() || value < readBest()) { setBest(value); newBest = true; }
    rounds.push(value);
    if (!averageMode.checked || rounds.length === 5) {
      const average = Math.round(rounds.reduce((sum, item) => sum + item, 0) / rounds.length);
      lastRecord = { value: averageMode.checked ? average : value, rating: rating(averageMode.checked ? average : value), average: averageMode.checked };
      result.innerHTML = '<strong>반응속도 ' + (averageMode.checked ? '5회 평균' : '') + '</strong><b>' + lastRecord.value + ' ms</b><p>' + lastRecord.rating + (newBest ? ' 🏆 최고 기록 갱신!' : '') + '</p>';
      result.classList.remove('hidden'); rounds = [];
    } else {
      message.textContent = value + ' ms 기록! ' + (5 - rounds.length) + '회 더 진행합니다.';
      setTimeout(begin, 700);
    }
    renderBest(); resetPad();
  }
  pad.addEventListener('click', () => {
    if (state === 'waiting') { clearTimeout(timer); state = 'idle'; pad.className = 'reaction-pad early'; message.textContent = '너무 빨랐습니다! 다시 시작하세요.'; startButton.disabled = false; return; }
    if (state === 'ready') { showRecord(Math.round(performance.now() - startedAt)); }
  });
  startButton.addEventListener('click', begin);
  shareButton.addEventListener('click', () => { if (lastRecord) shareGameResult({ title: document.title, text: '⚡ 반응속도 테스트 결과\n\n내 기록: ' + lastRecord.value + 'ms\n평가: ' + lastRecord.rating, container: result }); });
  copyButton.addEventListener('click', () => copyGameLink(window.location.href, { container: result }));
  renderBest();
})();