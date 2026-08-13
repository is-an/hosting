// ============ 나이 계산기 로직 ============

const birthDate = document.getElementById("birthDate");
const baseDate = document.getElementById("baseDate");
const setTodayBtn = document.getElementById("setTodayBtn");
const ageCalcBtn = document.getElementById("ageCalcBtn");
const ageCopyBtn = document.getElementById("ageCopyBtn");
const ageResetBtn = document.getElementById("ageResetBtn");
const ageResult = document.getElementById("ageResult");

function calculateAge() {
  if (!birthDate.value || !baseDate.value) return;
  
  const birth = new Date(birthDate.value);
  const base = new Date(baseDate.value);
  
  let age = base.getFullYear() - birth.getFullYear();
  const m = base.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && base.getDate() < birth.getDate())) {
    age--;
  }
  
  const days = Math.floor((base - birth) / (1000 * 60 * 60 * 24));
  
  let nextBirthday = new Date(base.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < base) {
    nextBirthday = new Date(base.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntil = Math.ceil((nextBirthday - base) / (1000 * 60 * 60 * 24));
  
  document.getElementById("ageValue").textContent = `${age}세`;
  document.getElementById("ageDays").textContent = `${formatNumber(days)}일`;
  document.getElementById("daysUntilBirthday").textContent = `${daysUntil}일`;
  ageResult.classList.remove("hidden");
}

function resetAge() {
  birthDate.value = "";
  baseDate.value = "";
  ageResult.classList.add("hidden");
}

setTodayBtn.addEventListener("click", () => {
  baseDate.value = dateToInputValue(new Date());
  calculateAge();
});

ageCalcBtn.addEventListener("click", calculateAge);
ageCopyBtn.addEventListener("click", () => {
  const text = `만 나이: ${document.getElementById("ageValue").textContent}, 경과일: ${document.getElementById("ageDays").textContent}, 다음생일: ${document.getElementById("daysUntilBirthday").textContent}`;
  copyToClipboard(text);
});
ageResetBtn.addEventListener("click", resetAge);

// 실시간 계산
birthDate.addEventListener("change", calculateAge);
baseDate.addEventListener("change", calculateAge);
