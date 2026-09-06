// ============ 대출 이자 계산기 로직 ============

const loanAmount = document.getElementById("loanAmount");
const loanRate = document.getElementById("loanRate");
const loanTerm = document.getElementById("loanTerm");
const loanType = document.getElementById("loanType");
const loanCalcBtn = document.getElementById("loanCalcBtn");
const loanCopyBtn = document.getElementById("loanCopyBtn");
const loanResetBtn = document.getElementById("loanResetBtn");
const loanResult = document.getElementById("loanResult");

function calculateLoan() {
  const principal = parseFloat(loanAmount.value) || 0;
  const annualRate = parseFloat(loanRate.value) || 0;
  const months = parseFloat(loanTerm.value) || 0;
  const type = loanType.value;
  
  if (!principal || !annualRate || !months) return;
  
  const monthlyRate = annualRate / 12 / 100;
  let monthlyPayment = 0;
  let totalInterest = 0;
  
  if (type === "equal-payment") {
    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    totalInterest = monthlyPayment * months - principal;
  } else {
    const principalPerMonth = principal / months;
    let totalPayment = 0;
    for (let i = 0; i < months; i++) {
      const remainingPrincipal = principal - (principalPerMonth * i);
      const interest = remainingPrincipal * monthlyRate;
      totalPayment += principalPerMonth + interest;
    }
    monthlyPayment = (principal / months) + (principal * monthlyRate);
    totalInterest = totalPayment - principal;
  }
  
  document.getElementById("monthlyPayment").textContent = formatNumber(monthlyPayment);
  document.getElementById("totalInterest").textContent = formatNumber(totalInterest);
  document.getElementById("totalPayment").textContent = formatNumber(principal + totalInterest);
  loanResult.classList.remove("hidden");
}

loanCalcBtn.addEventListener("click", calculateLoan);
loanCopyBtn.addEventListener("click", () => {
  const text = `월 상환액: ${document.getElementById("monthlyPayment").textContent}, 총 이자: ${document.getElementById("totalInterest").textContent}, 총 상환액: ${document.getElementById("totalPayment").textContent}`;
  copyToClipboard(text);
});
loanResetBtn.addEventListener("click", () => {
  loanAmount.value = "";
  loanRate.value = "";
  loanTerm.value = "";
  loanResult.classList.add("hidden");
});

loanAmount.addEventListener("input", calculateLoan);
loanRate.addEventListener("input", calculateLoan);
loanTerm.addEventListener("input", calculateLoan);

if (typeof renderRelatedByCategory === "function") {
  renderRelatedByCategory("relatedList", "cal", "loan", 5);
}
loanType.addEventListener("change", calculateLoan);
