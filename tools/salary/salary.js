// ============ 연봉 계산기 로직 ============

const annualSalary = document.getElementById("annualSalary");
const salaryCalcBtn = document.getElementById("salaryCalcBtn");
const salaryCopyBtn = document.getElementById("salaryCopyBtn");
const salaryResetBtn = document.getElementById("salaryResetBtn");
const salaryResult = document.getElementById("salaryResult");

function calculateSalary() {
  const annual = parseFloat(annualSalary.value) || 0;
  const monthly = annual / 12;
  
  const incomeTax = monthly * 0.08;
  const employmentInsurance = monthly * 0.01;
  const healthInsurance = monthly * 0.032;
  const pensionInsurance = monthly * 0.045;
  
  const totalDeduction = incomeTax + employmentInsurance + healthInsurance + pensionInsurance;
  const netMonthly = monthly - totalDeduction;
  const netAnnual = netMonthly * 12;
  
  document.getElementById("monthlySalary").textContent = formatNumber(monthly);
  document.getElementById("monthlyNetSalary").textContent = formatNumber(netMonthly);
  document.getElementById("annualNetSalary").textContent = formatNumber(netAnnual);
  salaryResult.classList.remove("hidden");
}

salaryCalcBtn.addEventListener("click", calculateSalary);
salaryCopyBtn.addEventListener("click", () => {
  const text = `월급: ${document.getElementById("monthlySalary").textContent}, 월 실수령액: ${document.getElementById("monthlyNetSalary").textContent}, 연 실수령액: ${document.getElementById("annualNetSalary").textContent}`;
  copyToClipboard(text);
});
salaryResetBtn.addEventListener("click", () => {
  annualSalary.value = "";
  salaryResult.classList.add("hidden");
});

annualSalary.addEventListener("input", calculateSalary);
