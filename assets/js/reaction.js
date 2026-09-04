/* =========================================================
   reaction.js — 반응속도 테스트
   ---------------------------------------------------------
   상태: idle → waiting → go → (result | between) / tooSoon
     waiting  1.2~4.2초 무작위 대기
     go       performance.now() 기준으로 반응 시간 측정
     tooSoon  대기 중 클릭 = 무효
   ========================================================= */

(function () {
  var BEST_KEY = 'isan:reaction:best';
  var ROUND = 5;

  var el = {
    pad: document.getElementById('pad'),
    big: document.getElementById('padBig'),
    msg: document.getElementById('padMsg'),
    best: document.getElementById('bestScore'),
    round: document.getElementById('roundScore'),
    mode: document.getElementById('modeBtn'),
    start: document.getElementById('startBtn'),
    share: document.getElementById('shareBtn'),
    link: document.getElementById('linkBtn'),
    record: document.getElementById('record'),
    recordLabel: document.getElementById('recordLabel'),
    recordValue: document.getElementById('recordValue'),
    attempts: document.getElementById('attempts'),
    clear: document.getElementById('clearBtn')
  };
  if (!el.pad) { return; }

  var phase = 'idle';
  var averageMode = false;
  var attempts = [];
  var last = null;
  var best = null;
  var timer = null;
  var goAt = 0;

  try {
    var stored = localStorage.getItem(BEST_KEY);
    best = stored ? Number(stored) : null;
  } catch (e) {}

  function avg() {
    if (!attempts.length) { return null; }
    return Math.round(attempts.reduce(function (a, b) { return a + b; }, 0) / attempts.length);
  }

  function paint() {
    var view = {
      idle:    { big: '준비',            msg: '시작 버튼을 눌러 준비하세요.' },
      waiting: { big: '대기',            msg: '초록색으로 바뀌면 바로 누르세요.' },
      go:      { big: '지금!',           msg: '패드를 누르세요.' },
      between: { big: last + 'ms',       msg: attempts.length + ' / ' + ROUND + '회 · 다음 라운드를 준비합니다.' },
      result:  { big: last + 'ms',       msg: '다시 하려면 패드를 누르세요.' },
      tooSoon: { big: '무효',            msg: '화면이 바뀌기 전에 눌렀습니다. 다시 시도하세요.' }
    }[phase];

    el.pad.dataset.phase = phase;
    el.big.textContent = view.big;
    el.msg.textContent = view.msg;

    el.best.textContent = best === null ? '—' : best + 'ms';
    el.round.textContent = averageMode
      ? attempts.length + ' / ' + ROUND
      : (last === null ? '—' : last + 'ms');

    el.mode.setAttribute('aria-pressed', averageMode ? 'true' : 'false');
    el.start.textContent = phase === 'idle' ? '게임 시작' : '다시 시작';

    if (!attempts.length) {
      el.record.hidden = true;
    } else {
      el.record.hidden = false;
      el.recordLabel.textContent = averageMode
        ? (attempts.length >= ROUND ? ROUND + '회 평균' : '진행 중 평균')
        : '이번 기록';
      el.recordValue.textContent = (averageMode ? avg() : last) + 'ms';
      el.attempts.innerHTML = attempts.map(function (ms, i) {
        return '<span class="v2-attempt">' + (i + 1) + '회 ' + ms + 'ms</span>';
      }).join('');
    }
  }

  function arm() {
    clearTimeout(timer);
    phase = 'waiting';
    last = null;
    paint();
    timer = setTimeout(function () {
      goAt = performance.now();
      phase = 'go';
      paint();
    }, 1200 + Math.random() * 3000);
  }

  function restart() {
    clearTimeout(timer);
    attempts = [];
    arm();
  }

  function finish(ms) {
    attempts = attempts.concat([ms]);
    if (best === null || ms < best) {
      best = ms;
      try { localStorage.setItem(BEST_KEY, String(ms)); } catch (e) {}
    }
    last = ms;

    var done = !averageMode || attempts.length >= ROUND;
    phase = done ? 'result' : 'between';
    paint();
    if (!done) { timer = setTimeout(arm, 900); }
  }

  el.pad.addEventListener('click', function () {
    if (phase === 'idle' || phase === 'result' || phase === 'tooSoon') { restart(); return; }
    if (phase === 'waiting') {
      clearTimeout(timer);
      attempts = [];
      phase = 'tooSoon';
      paint();
      return;
    }
    if (phase === 'go') { finish(Math.round(performance.now() - goAt)); }
  });

  el.start.addEventListener('click', restart);

  el.mode.addEventListener('click', function () {
    clearTimeout(timer);
    averageMode = !averageMode;
    attempts = [];
    last = null;
    phase = 'idle';
    paint();
  });

  el.clear.addEventListener('click', function () {
    try { localStorage.removeItem(BEST_KEY); } catch (e) {}
    clearTimeout(timer);
    best = null;
    attempts = [];
    last = null;
    phase = 'idle';
    paint();
  });

  el.share.addEventListener('click', function () {
    var score = averageMode && avg() !== null
      ? ROUND + '회 평균 ' + avg() + 'ms'
      : (last !== null ? last + 'ms' : '기록 없음');
    var url = window.location.origin + window.location.pathname;
    var text = '반응속도 테스트 · ' + score + ' — ' + url;

    if (typeof shareGameResult === 'function') {
      shareGameResult(text, url);
    } else if (navigator.share) {
      try { navigator.share({ title: '반응속도 테스트', text: text }); } catch (e) {}
    } else {
      try { navigator.clipboard.writeText(text); } catch (e) {}
    }
    el.share.textContent = '공유됨';
  });

  el.link.addEventListener('click', function () {
    var url = window.location.origin + window.location.pathname;
    if (typeof copyGameLink === 'function') {
      copyGameLink(url);
    } else {
      try { navigator.clipboard.writeText(url); } catch (e) {}
    }
    el.link.textContent = '링크 복사됨';
  });

  window.addEventListener('beforeunload', function () { clearTimeout(timer); });

  paint();

  if (typeof renderRelatedByCategory === 'function') {
    renderRelatedByCategory('relatedList', 'games', 'reaction', 5);
  }
})();
