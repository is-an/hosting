// ============ D-Day 계산기 로직 ============

const targetDate = document.getElementById("targetDate");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const todayText = document.getElementById("todayText");
const result = document.getElementById("result");
const resultLabel = document.getElementById("resultLabel");
const resultNumber = document.getElementById("resultNumber");
const resultDetail = document.getElementById("resultDetail");
const resultCopyBtn = document.getElementById("resultCopyBtn");

function updateToday() {
  const today = localDateOnly();
  todayText.textContent = formatDate(today);
}

function calculateDday() {
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

function resetDday() {
  targetDate.value = "";
  result.classList.add("hidden");
}

// 초기화
updateToday();
const today = localDateOnly();
targetDate.min = "1900-01-01";
targetDate.value = dateToInputValue(today);
calculateDday();

// 이벤트 리스너
calculateBtn.addEventListener("click", calculateDday);
resetBtn.addEventListener("click", resetDday);
targetDate.addEventListener("change", calculateDday);
resultCopyBtn.addEventListener("click", () => {
  const text = `${resultLabel.textContent}: ${resultNumber.textContent} - ${resultDetail.textContent}`;
  copyToClipboard(text);
});
