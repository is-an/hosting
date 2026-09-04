/* =========================================================
   header-nav.js — 모바일 메뉴 토글 + 헤더 검색 링크 경로
   ---------------------------------------------------------
   ▸ common.js 는 헤더를 fetch 로 주입하므로 주입 시점을 기다립니다.
   ▸ common.js 다음에 로드하세요. 모든 페이지에 넣어도 안전합니다.
   ========================================================= */

(function () {
  function basePath() {
    if (typeof getSiteBasePath === 'function') {
      try { return getSiteBasePath(); } catch (e) {}
    }
    return '';
  }

  function bind(header) {
    var toggle = header.querySelector('#navToggle');
    var nav = header.querySelector('#mainNav');
    var search = header.querySelector('#headerSearch');

    if (search) {
      search.href = (basePath() || '') + '/';
    }

    if (!toggle || !nav || toggle.dataset.navBound === 'true') { return; }
    toggle.dataset.navBound = 'true';

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) { setOpen(false); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) { setOpen(false); }
    });
  }

  function start() {
    var slot = document.getElementById('site-header');
    if (!slot) { return; }

    var existing = slot.querySelector('.site-header');
    if (existing) { bind(existing); return; }

    var observer = new MutationObserver(function () {
      var header = slot.querySelector('.site-header');
      if (header) {
        observer.disconnect();
        bind(header);
      }
    });
    observer.observe(slot, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
