// ============ FAQ 카테고리 로더 ============
// 개별 페이지의 "자주 묻는 질문"을 중앙 FAQ 페이지(/faq/)에서 가져와 주입한다.
// FAQ 문구의 원본은 /faq/index.html 한 곳뿐이며, 각 페이지는 자기 카테고리 항목만 표시한다.
// 사용법: <div class="faq-list" data-faq-category="lotto"></div> 를 두고
//        loadCategoryFaq('lotto', '.faq-list[data-faq-category="lotto"]') 호출.

(function () {
  // 사이트 루트는 common.js 의 getSiteBasePath() 로 유도한다(faq.js 는 common.js 뒤에 로드됨).
  function faqBasePath() {
    return (typeof getSiteBasePath === 'function') ? getSiteBasePath() : '';
  }

  var faqDocPromise = null;

  function fetchFaqDocument() {
    if (!faqDocPromise) {
      var url = faqBasePath() + '/faq/';
      faqDocPromise = fetch(url, { cache: 'no-cache' })
        .then(function (response) {
          if (!response.ok) throw new Error('FAQ 페이지를 불러오지 못했습니다: ' + response.status);
          return response.text();
        })
        .then(function (html) {
          return new DOMParser().parseFromString(html, 'text/html');
        });
    }
    return faqDocPromise;
  }

  // category: /faq/ 페이지의 [data-faq-category="..."] 값
  // target: 항목을 넣을 요소 또는 셀렉터
  // 반환: 주입 성공 여부(boolean)로 resolve 되는 Promise
  window.loadCategoryFaq = function (category, target) {
    var container = typeof target === 'string' ? document.querySelector(target) : target;
    if (!container) return Promise.resolve(false);

    return fetchFaqDocument()
      .then(function (doc) {
        var source = doc.querySelector('[data-faq-category="' + category + '"] .faq-list');
        if (!source) {
          container.hidden = true;
          return false;
        }
        container.innerHTML = source.innerHTML;
        container.hidden = false;
        // 컨테이너가 hidden 섹션 안에 있으면 그 섹션도 노출한다(로드 실패 시엔 숨김 유지).
        var hiddenAncestor = container.closest('[hidden]');
        if (hiddenAncestor) hiddenAncestor.hidden = false;
        // 주입된 마크업에도 data-i18n 이 있으므로 현재 언어를 다시 적용한다.
        if (typeof applyLanguage === 'function' && typeof getCurrentLanguage === 'function') {
          applyLanguage(getCurrentLanguage());
        }
        return true;
      })
      .catch(function (error) {
        console.warn('[faq] ' + error.message);
        container.hidden = true;
        return false;
      });
  };
})();
