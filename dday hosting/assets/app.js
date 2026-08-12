const targetDate = document.getElementById("targetDate");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const todayText = document.getElementById("todayText");
const result = document.getElementById("result");
const resultLabel = document.getElementById("resultLabel");
const resultNumber = document.getElementById("resultNumber");
const resultDetail = document.getElementById("resultDetail");

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
