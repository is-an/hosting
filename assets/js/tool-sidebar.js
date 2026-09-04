/* =========================================================
   tool-sidebar.js — 상세 페이지 사이드바(관련 도구 / 가이드) 렌더
   ---------------------------------------------------------
   ▸ tools-data.js 다음에 로드합니다.
   ▸ 페이지에서 아래 전역 함수를 호출합니다.
       renderRelatedTools('relatedList', ['age','loan']) // id 배열
       renderRelatedByCategory('relatedList', 'cal', 'dday', 5)
       renderGuideList('guideList', 3)
   ▸ 도구가 추가되면 tools-data.js 만 고치면 여기도 따라옵니다.
   ========================================================= */

(function () {
  var DATA = window.SITE_TOOLS;
  if (!DATA) { return; }

  function basePath() {
    if (typeof getSiteBasePath === 'function') {
      try { return getSiteBasePath() || ''; } catch (e) {}
    }
    return '';
  }

  function node(tag, className, text) {
    var n = document.createElement(tag);
    if (className) { n.className = className; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function row(tool) {
    var a = node('a', 'v2-side-row');
    a.href = basePath() + tool.href;
    var name = node('span', 'v2-side-name', tool.name);
    if (tool.key) { name.setAttribute('data-i18n', tool.key); }
    a.appendChild(name);
    a.appendChild(node('span', 'v2-side-short', tool.short || ''));
    return a;
  }

  function paint(targetId, tools) {
    var target = document.getElementById(targetId);
    if (!target) { return; }
    target.innerHTML = '';
    tools.forEach(function (t) { target.appendChild(row(t)); });
    if (typeof applyLanguage === 'function' && typeof getCurrentLanguage === 'function') {
      applyLanguage(getCurrentLanguage());
    }
  }

  window.renderRelatedTools = function (targetId, ids) {
    var tools = ids.map(function (id) {
      for (var i = 0; i < DATA.TOOLS.length; i++) {
        if (DATA.TOOLS[i].id === id) { return DATA.TOOLS[i]; }
      }
      return null;
    }).filter(Boolean);
    paint(targetId, tools);
  };

  window.renderRelatedByCategory = function (targetId, cat, excludeId, limit) {
    var tools = DATA.TOOLS.filter(function (t) {
      return t.cat === cat && t.id !== excludeId;
    }).slice(0, limit || 5);
    paint(targetId, tools);
  };

  window.renderGuideList = function (targetId, limit) {
    var target = document.getElementById(targetId);
    if (!target) { return; }
    target.innerHTML = '';
    DATA.GUIDES.slice(0, limit || DATA.GUIDES.length).forEach(function (g) {
      var a = node('a', 'v2-side-guide', g.title);
      a.href = basePath() + g.href;
      target.appendChild(a);
    });
  };
})();
