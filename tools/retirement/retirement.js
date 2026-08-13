// ============ 퇴직금 계산기 로직 ============

const joinDate = document.getElementById("joinDate");
const leaveDate = document.getElementById("leaveDate");
const lastSalary = document.getElementById("lastSalary");
const bonus = document.getElementById("bonus");
const retirementCalcBtn = document.getElementById("retirementCalcBtn");
const retirementCopyBtn = document.getElementById("retirementCopyBtn");
const retirementResetBtn = document.getElementById("retirementResetBtn");
const retirementResult = document.getElementById("retirementResult");

function calculateRetirement() {
  if (!joinDate.value || !leaveDate.value) return;
  
  const join = new Date(joinDate.value);
  const leave = new Date(leaveDate.value);
  
  const diff = leave - join;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = (days / 365).toFixed(2);
  
  const salary = parseFloat(lastSalary.value) || 0;
  const bonusAmount = parseFloat(bonus.value) || 0;
  const totalWage = (salary * 12 + bonusAmount) / 12;
  
  const retirementAmount = totalWage * (days / 365) * 1 / 30 * 30;
  
  document.getElementById("serviceYears").textContent = `${years}년 (${days}일)`;
  document.getElementById("averageWage").textContent = formatNumber(totalWage);
  document.getElementById("estimatedRetirement").textContent = formatNumber(retirementAmount);
  retirementResult.classList.remove("hidden");
}

retirementCalcBtn.addEventListener("click", calculateRetirement);
retirementCopyBtn.addEventListener("click", () => {
  const text = `근무: ${document.getElementById("serviceYears").textContent}, 평균임금: ${document.getElementById("averageWage").textContent}, 예상퇴직금: ${document.getElementById("estimatedRetirement").textContent}`;
  copyToClipboard(text);
});
retirementResetBtn.addEventListener("click", () => {
  joinDate.value = "";
  leaveDate.value = "";
  lastSalary.value = "";
  bonus.value = "0";
  retirementResult.classList.add("hidden");
});

joinDate.addEventListener("change", calculateRetirement);
leaveDate.addEventListener("change", calculateRetirement);
lastSalary.addEventListener("input", calculateRetirement);
bonus.addEventListener("input", calculateRetirement);
