// ============ 공통 유틸리티 함수 ============

/**
 * 숫자를 천 단위 구분자로 포매팅
 */
function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 숫자를 지정된 소수 자리로 반올림
 */
function formatDecimal(num, digits = 2) {
  return (Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits);
}

/**
 * 텍스트를 클립보드에 복사
 */
function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("복사되었습니다!");
}

// ============ 날짜 관련 유틸리티 함수 ============

/**
 * 시간 부분을 제거한 날짜만 반환
 */
function localDateOnly(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * 한국어 형식으로 날짜 포매팅
 */
function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

/**
 * Date 객체를 input type="date" 형식 (YYYY-MM-DD)으로 변환
 */
function dateToInputValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * input type="date" 형식 (YYYY-MM-DD)을 Date 객체로 파싱
 */
function parseInputDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// ============ 탭 전환 로직 (하위 페이지용) ============

/**
 * 계산기 탭 전환 (동일 페이지 내의 여러 탭)
 */
function switchCalcTab(tabName) {
  const contents = document.querySelectorAll(".calc-tab-content");
  const buttons = document.querySelectorAll(".calc-tab-btn");
  
  contents.forEach(c => c.classList.remove("active"));
  buttons.forEach(b => b.classList.remove("active"));
  
  const activeContent = document.getElementById(tabName);
  const activeBtn = document.querySelector(`.calc-tab-btn[data-calc="${tabName}"]`);
  
  if (activeContent) activeContent.classList.add("active");
  if (activeBtn) activeBtn.classList.add("active");
}

/**
 * 계산기 탭 버튼 이벤트 리스너 초기화
 */
function initCalcTabButtons() {
  const calcTabBtns = document.querySelectorAll(".calc-tab-btn");
  calcTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-calc");
      switchCalcTab(tabName);
    });
  });
}

// ============ 메인 홈페이지 검색 및 필터 기능 ============

/**
 * 메인 홈페이지의 도구 검색 및 필터 초기화
 */
function initToolsFilter() {
  const searchInput = document.getElementById('toolSearch');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const toolCards = document.querySelectorAll('.tool-card');
  
  if (!searchInput || !filterBtns.length || !toolCards.length) {
    return; // 홈페이지가 아닐 경우 실행하지 않음
  }
  
  function filterTools() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    toolCards.forEach(card => {
      const name = card.dataset.name?.toLowerCase() || '';
      const category = card.parentElement.dataset.category || '';
      
      const matchesSearch = name.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      
      card.style.display = (matchesSearch && matchesFilter) ? '' : 'none';
    });
  }
  
  searchInput.addEventListener('input', filterTools);
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterTools();
    });
  });
}

// 페이지 로드 시 필터 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initToolsFilter);
} else {
  initToolsFilter();
}
