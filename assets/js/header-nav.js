/* =========================================================
   header-nav.js — 모바일 메뉴 팝업 + 도구 검색 팝업
   ---------------------------------------------------------
   ▸ common.js 는 헤더를 fetch 로 주입하므로 주입 시점을 기다립니다.
   ▸ common.js 다음에 로드하세요. 모든 페이지에 넣어도 안전합니다.
   ========================================================= */

(function () {
  function basePath() {
    if (typeof getSiteBasePath === 'function') {
      try { return getSiteBasePath() || ''; } catch (e) {}
    }
    return '';
  }

  function t(key, fallback) {
    try {
      if (typeof translate === 'function' && typeof getCurrentLanguage === 'function') {
        var v = translate(key, getCurrentLanguage());
        if (v && v !== key) { return v; }
      }
    } catch (e) {}
    return fallback;
  }

  /* ---------- 도구 검색 팝업 ---------- */
  var overlay, input, resultsEl, tools = null, activeIdx = -1;

  function loadTools(cb) {
    if (window.SITE_TOOLS && window.SITE_TOOLS.TOOLS) {
      tools = window.SITE_TOOLS.TOOLS;
      cb();
      return;
    }
    var s = document.createElement('script');
    s.src = basePath() + '/assets/js/tools-data.js';
    s.onload = function () {
      tools = (window.SITE_TOOLS && window.SITE_TOOLS.TOOLS) || [];
      cb();
    };
    s.onerror = function () { tools = []; cb(); };
    document.head.appendChild(s);
  }

  function catName(cat) {
    var cats = window.SITE_TOOLS && window.SITE_TOOLS.CATEGORIES;
    if (!cats) { return ''; }
    for (var i = 0; i < cats.length; i++) {
      if (cats[i].id === cat) { return cats[i].name; }
    }
    return '';
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'v2-search-overlay';
    overlay.hidden = true;
    overlay.innerHTML =
      '<div class="v2-search-modal" role="dialog" aria-modal="true" aria-label="도구 검색">' +
      '<input type="text" class="v2-search-modal-input" id="siteSearchInput" autocomplete="off" ' +
      'spellcheck="false" data-i18n-placeholder="home_searchLabel" placeholder="도구 검색">' +
      '<div class="v2-search-modal-results" id="siteSearchResults"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    input = overlay.querySelector('#siteSearchInput');
    resultsEl = overlay.querySelector('#siteSearchResults');
    input.placeholder = t('home_searchLabel', '도구 검색');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) { closeSearch(); }
    });
    input.addEventListener('input', renderResults);
    input.addEventListener('keydown', onKey);
  }

  function openSearch(trigger) {
    if (!overlay) { buildOverlay(); }
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    overlay._trigger = trigger || null;
    loadTools(renderResults);
    setTimeout(function () { input.focus(); }, 0);
  }

  function closeSearch() {
    if (!overlay || overlay.hidden) { return; }
    overlay.hidden = true;
    document.body.style.overflow = '';
    activeIdx = -1;
    if (overlay._trigger) { try { overlay._trigger.focus(); } catch (e) {} }
  }

  function renderResults() {
    if (!resultsEl) { return; }
    var q = (input.value || '').trim().toLowerCase();
    var words = q.split(/\s+/).filter(Boolean);
    var list = [];
    if (tools && tools.length) {
      list = tools.filter(function (item) {
        if (!words.length) { return true; }
        var hay = (item.name + ' ' + (item.desc || '') + ' ' + (item.short || '') + ' ' + (item.keywords || '')).toLowerCase();
        return words.every(function (w) { return hay.indexOf(w) > -1; });
      }).slice(0, 8);
    }

    resultsEl.innerHTML = '';
    activeIdx = -1;

    if (!list.length) {
      var empty = document.createElement('p');
      empty.className = 'v2-search-modal-empty';
      empty.textContent = q
        ? t('home_empty_title', '검색 결과가 없습니다.')
        : '도구 이름을 입력하세요.';
      resultsEl.appendChild(empty);
      return;
    }

    list.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'v2-search-result';
      a.href = basePath() + item.href;
      var name = document.createElement('span');
      name.className = 'v2-search-result-name';
      name.textContent = item.name;
      var cat = document.createElement('span');
      cat.className = 'v2-search-result-cat';
      cat.textContent = catName(item.cat);
      a.appendChild(name);
      a.appendChild(cat);
      resultsEl.appendChild(a);
    });
  }

  function onKey(e) {
    var items = resultsEl.querySelectorAll('.v2-search-result');
    if (e.key === 'Escape') {
      closeSearch();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!items.length) { return; }
      e.preventDefault();
      activeIdx += (e.key === 'ArrowDown' ? 1 : -1);
      if (activeIdx < 0) { activeIdx = items.length - 1; }
      if (activeIdx >= items.length) { activeIdx = 0; }
      for (var i = 0; i < items.length; i++) {
        items[i].classList.toggle('is-active', i === activeIdx);
      }
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      var target = activeIdx > -1 ? items[activeIdx] : items[0];
      if (target) { window.location.href = target.href; }
    }
  }

  /* ---------- 헤더 바인딩 ---------- */
  function bind(header) {
    var toggle = header.querySelector('#navToggle');
    var nav = header.querySelector('#mainNav');
    var search = header.querySelector('#headerSearch');

    if (search && search.dataset.searchBound !== 'true') {
      search.dataset.searchBound = 'true';
      search.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch(search);
      });
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

    // 언어 선택 팝업과 동일하게 바깥을 누르면 닫힌다.
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') &&
          !nav.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') { return; }
      if (overlay && !overlay.hidden) { closeSearch(); return; }
      if (nav.classList.contains('is-open')) {
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
