// D-Day 계산기 관련 요소들
const targetDate = document.getElementById("targetDate");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const todayText = document.getElementById("todayText");
const result = document.getElementById("result");
const resultLabel = document.getElementById("resultLabel");
const resultNumber = document.getElementById("resultNumber");
const resultDetail = document.getElementById("resultDetail");

// 로또번호 생성기 관련 요소들
const generateBtn = document.getElementById("generateBtn");
const generateMultipleBtn = document.getElementById("generateMultipleBtn");
const lotteryDisplay = document.getElementById("lotteryDisplay");
const multipleNumbers = document.getElementById("multipleNumbers");

// 탭 전환 관련
const navButtons = document.querySelectorAll(".nav-btn");
const tabContents = document.querySelectorAll(".tab-content");

// ============ 탭 전환 로직 ============
function switchTab(tabName) {
  // 모든 탭 콘텐츠 숨기기
  tabContents.forEach(tab => tab.classList.remove("active"));
  
  // 모든 네비게이션 버튼 비활성화
  navButtons.forEach(btn => btn.classList.remove("active"));
  
  // 선택된 탭 표시
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }
  
  // 선택된 네비게이션 버튼 활성화
  const activeNavBtn = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeNavBtn) {
    activeNavBtn.classList.add("active");
  }
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tabName = btn.getAttribute("data-tab");
    switchTab(tabName);
  });
});

// 홈의 도구 카드 버튼도 탭 전환 지원
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("tool-btn")) {
    const tabName = e.target.getAttribute("data-tab");
    if (tabName) {
      switchTab(tabName);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

// ============ D-Day 계산기 로직 ============
function localDateOnly(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function dateToInputValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseInputDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function updateToday() {
  const today = localDateOnly();
  todayText.textContent = formatDate(today);
}

function calculate() {
  if (!targetDate.value) {
    result.classList.add("hidden");
    return;
  }

  const today = localDateOnly();
  const target = localDateOnly(parseInputDate(targetDate.value));
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((target - today) / msPerDay);

  result.classList.remove("hidden");

  if (diffDays > 0) {
    resultLabel.textContent = "목표일까지";
    resultNumber.textContent = `D-${diffDays}`;
    resultDetail.textContent = `${formatDate(target)}까지 ${diffDays}일 남았습니다.`;
  } else if (diffDays === 0) {
    resultLabel.textContent = "오늘은";
    resultNumber.textContent = "D-Day";
    resultDetail.textContent = "목표 날짜가 오늘입니다.";
  } else {
    const passed = Math.abs(diffDays);
    resultLabel.textContent = "목표 날짜로부터";
    resultNumber.textContent = `D+${passed}`;
    resultDetail.textContent = `${formatDate(target)}로부터 ${passed}일이 지났습니다.`;
  }
}

function reset() {
  targetDate.value = "";
  result.classList.add("hidden");
}

updateToday();

const today = localDateOnly();
targetDate.min = "1900-01-01";
targetDate.value = dateToInputValue(today);

calculate();

calculateBtn.addEventListener("click", calculate);
resetBtn.addEventListener("click", reset);
targetDate.addEventListener("change", calculate);

// ============ 로또번호 생성 로직 ============
function generateLotteryNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayLotteryNumbers(numbers) {
  lotteryDisplay.innerHTML = numbers.map(num => `<div class="lottery-ball">${num}</div>`).join("");
}

function generateSingle() {
  const numbers = generateLotteryNumbers();
  displayLotteryNumbers(numbers);
  multipleNumbers.classList.add("hidden");
}

function generateMultiple() {
  multipleNumbers.classList.remove("hidden");
  let html = "";
  
  for (let i = 0; i < 5; i++) {
    const numbers = generateLotteryNumbers();
    html += `<div class="lottery-set"><strong>세트 ${i + 1}:</strong> ${numbers.join(", ")}</div>`;
  }
  
  multipleNumbers.innerHTML = html;
  lotteryDisplay.innerHTML = "";
}

generateBtn.addEventListener("click", generateSingle);
generateMultipleBtn.addEventListener("click", generateMultiple);

// 초기 로또 번호 생성
generateSingle();

