/* =========================================================
   home.js — 홈(index.html) 렌더링 / 검색 / 즐겨찾기 / 최근 사용
   ---------------------------------------------------------
   ▸ 데이터는 assets/js/tools-data.js 한 곳에서만 옵니다.
   ▸ 전역 스크립트 (ES 모듈 아님). common.js 다음에 로드합니다.
   ▸ common.js 의 initToolsFilter() 는 .tool-card 가 있을 때만
     동작하므로 이 페이지와 충돌하지 않습니다.
   ========================================================= */

(function () {
  var DATA = window.SITE_TOOLS;
  if (!DATA) { return; }

  var FAV_KEY = 'isan:favorites';
  var RECENT_KEY = 'isan:recent';
  var RECENT_MAX = 5;

  var base = (function () {
    // common.js 와 동일하게 스크립트 경로에서 사이트 루트를 유추
    var s = Array.prototype.slice.call(document.scripts).filter(function (x) {
      return x.src && /assets\/js\/home\.js(?:\?.*)?$/.test(x.src);
    })[0];
    if (!s) { return ''; }
    var p = new URL(s.src, window.location.href).pathname.replace(/\/assets\/js\/home\.js.*$/, '');
    return p === '/' ? '' : p;
  })();

  function url(href) { return base + href; }

  function read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || fallback); } catch (e) { return JSON.parse(fallback); }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  var favs = read(FAV_KEY, '[]');
  var recent = read(RECENT_KEY, '[]');
  var query = '';

  var el = {
    search: document.getElementById('toolSearch'),
    searchBtn: document.getElementById('toolSearchBtn'),
    chips: document.getElementById('searchChips'),
    popularSection: document.getElementById('popularSection'),
    popular: document.getElementById('popularList'),
    index: document.getElementById('toolIndex'),
    indexTitle: document.getElementById('indexTitle'),
    indexCount: document.getElementById('indexCount'),
    empty: document.getElementById('emptyState'),
    clearSearch: document.getElementById('clearSearchBtn'),
    recentSection: document.getElementById('recentSection'),
    recent: document.getElementById('recentList'),
    clearRecent: document.getElementById('clearRecentBtn'),
    favSection: document.getElementById('favoriteSection'),
    favs: document.getElementById('favoriteList'),
    guides: document.getElementById('guideList')
  };

  function byId(id) {
    for (var i = 0; i < DATA.TOOLS.length; i++) { if (DATA.TOOLS[i].id === id) { return DATA.TOOLS[i]; } }
    return null;
  }

  function matches(tool, q) {
    if (!q) { return true; }
    var hay = (tool.name + ' ' + tool.desc + ' ' + (tool.short || '') + ' ' + (tool.keywords || '')).toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(function (w) { return hay.indexOf(w) > -1; });
  }

  function node(tag, className, text) {
    var n = document.createElement(tag);
    if (className) { n.className = className; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function label(tag, className, tool, field) {
    var n = node(tag, className, field === 'desc' ? tool.desc : tool.name);
    var key = field === 'desc' ? tool.descKey : tool.key;
    if (key) { n.setAttribute('data-i18n', key); }
    return n;
  }

  function trackOpen(id) {
    recent = [id].concat(recent.filter(function (x) { return x !== id; })).slice(0, RECENT_MAX);
    write(RECENT_KEY, recent);
  }

  function toggleFav(id) {
    favs = favs.indexOf(id) > -1
      ? favs.filter(function (x) { return x !== id; })
      : [id].concat(favs);
    write(FAV_KEY, favs);
    render();
  }

  /* ---------- 렌더 ---------- */

  function renderChips() {
    if (!el.chips) { return; }
    el.chips.innerHTML = '';
    DATA.CHIPS.forEach(function (text) {
      var b = node('button', 'v2-chip', text);
      b.type = 'button';
      b.addEventListener('click', function () {
        query = text;
        if (el.search) { el.search.value = text; }
        render();
      });
      el.chips.appendChild(b);
    });
  }

  function renderPopular() {
    if (!el.popular) { return; }
    var list = DATA.TOOLS
      .filter(function (t) { return t.popular; })
      .sort(function (a, b) { return a.popular - b.popular; })
      .slice(0, 4);

    el.popular.innerHTML = '';
    list.forEach(function (t) {
      var a = node('a', 'v2-feature');
      a.href = url(t.href);
      a.addEventListener('click', function () { trackOpen(t.id); });
      a.appendChild(node('span', 'v2-rank', ('0' + t.popular).slice(-2)));
      a.appendChild(label('h3', null, t, 'name'));
      a.appendChild(label('p', null, t, 'desc'));
      el.popular.appendChild(a);
    });
    if (el.popularSection) { el.popularSection.hidden = !!query; }
  }

  function renderIndex() {
    if (!el.index) { return; }
    var filtered = DATA.TOOLS.filter(function (t) { return matches(t, query); });

    el.index.innerHTML = '';
    DATA.CATEGORIES.forEach(function (c) {
      var items = filtered.filter(function (t) { return t.cat === c.id; });
      if (!items.length) { return; }

      var group = node('div', 'v2-group');
      var head = node('div', 'v2-group-head');
      var dot = node('span', 'v2-group-dot');
      dot.style.background = c.dot;
      dot.setAttribute('aria-hidden', 'true');
      head.appendChild(dot);

      var h3 = node('h3', null, c.name);
      if (c.key) { h3.setAttribute('data-i18n', c.key); }
      head.appendChild(h3);
      head.appendChild(node('span', 'v2-count', String(items.length)));
      head.appendChild(node('span', 'v2-spacer'));

      var all = node('a', 'v2-all', '전체 보기 →');
      all.href = url(c.href);
      all.setAttribute('data-i18n', 'home_view_all');
      head.appendChild(all);
      group.appendChild(head);

      items.forEach(function (t) {
        var row = node('div', 'v2-row');
        var link = node('a', 'v2-row-link');
        link.href = url(t.href);
        link.addEventListener('click', function () { trackOpen(t.id); });
        link.appendChild(label('span', 'v2-row-name', t, 'name'));
        link.appendChild(node('span', 'v2-row-short', t.short || ''));
        row.appendChild(link);

        var isFav = favs.indexOf(t.id) > -1;
        var star = node('button', 'v2-star-btn', isFav ? '★' : '☆');
        star.type = 'button';
        star.setAttribute('aria-pressed', isFav ? 'true' : 'false');
        star.setAttribute('aria-label', (isFav ? '즐겨찾기 해제: ' : '즐겨찾기 추가: ') + t.name);
        star.addEventListener('click', function () { toggleFav(t.id); });
        row.appendChild(star);

        group.appendChild(row);
      });

      el.index.appendChild(group);
    });

    if (el.indexTitle) {
      el.indexTitle.textContent = query ? '검색 결과' : '전체 도구';
      el.indexTitle.setAttribute('data-i18n', query ? 'home_search_results' : 'home_index_title');
    }
    if (el.indexCount) { el.indexCount.textContent = (query ? filtered.length : DATA.TOOLS.length) + '개'; }
    if (el.empty) { el.empty.hidden = !(query && filtered.length === 0); }
  }

  function renderRecent() {
    if (!el.recent) { return; }
    var list = recent.map(byId).filter(Boolean);
    el.recent.innerHTML = '';
    list.forEach(function (t) {
      var a = node('a', 'v2-pill');
      a.href = url(t.href);
      a.appendChild(node('span', 'v2-dot'));
      a.appendChild(label('span', null, t, 'name'));
      el.recent.appendChild(a);
    });
    if (el.recentSection) { el.recentSection.hidden = !list.length || !!query; }
  }

  function renderFavs() {
    if (!el.favs) { return; }
    var list = favs.map(byId).filter(Boolean);
    el.favs.innerHTML = '';
    list.forEach(function (t) {
      var a = node('a', 'v2-fav');
      a.href = url(t.href);
      a.appendChild(node('span', 'v2-star', '★'));
      a.appendChild(label('span', null, t, 'name'));
      el.favs.appendChild(a);
    });
    if (el.favSection) { el.favSection.hidden = !list.length || !!query; }
  }

  function renderGuides() {
    if (!el.guides) { return; }
    el.guides.innerHTML = '';
    DATA.GUIDES.forEach(function (g) {
      var a = node('a', 'v2-guide');
      a.href = url(g.href);
      a.appendChild(node('span', null, g.title));
      a.appendChild(node('span', 'v2-guide-tool', g.tool));
      el.guides.appendChild(a);
    });
  }

  function render() {
    renderPopular();
    renderIndex();
    renderRecent();
    renderFavs();
    // 동적으로 만든 노드의 data-i18n 적용
    if (typeof applyLanguage === 'function' && typeof getCurrentLanguage === 'function') {
      applyLanguage(getCurrentLanguage());
    }
  }

  /* ---------- 이벤트 ---------- */

  if (el.search) {
    el.search.addEventListener('input', function (e) {
      query = e.target.value.trim();
      render();
    });
  }
  if (el.searchBtn) {
    el.searchBtn.addEventListener('click', function () { if (el.search) { el.search.focus(); } });
  }
  if (el.clearSearch) {
    el.clearSearch.addEventListener('click', function () {
      query = '';
      if (el.search) { el.search.value = ''; }
      render();
    });
  }
  if (el.clearRecent) {
    el.clearRecent.addEventListener('click', function () {
      recent = [];
      write(RECENT_KEY, recent);
      render();
    });
  }

  renderChips();
  renderGuides();
  render();
})();
