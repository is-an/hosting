// ============ 예금/적금 이자 계산기 로직 ============

const savingsAmount = document.getElementById("savingsAmount");
const savingsTerm = document.getElementById("savingsTerm");
const savingsRate = document.getElementById("savingsRate");
const savingsType = document.getElementById("savingsType");
const savingsCalcBtn = document.getElementById("savingsCalcBtn");
const savingsCopyBtn = document.getElementById("savingsCopyBtn");
const savingsResetBtn = document.getElementById("savingsResetBtn");
const savingsResult = document.getElementById("savingsResult");

function calculateSavings() {
  const amount = parseFloat(savingsAmount.value) || 0;
  const term = parseFloat(savingsTerm.value) || 0;
  const rate = parseFloat(savingsRate.value) || 0;
  const type = savingsType.value;
  
  if (!amount || !term || !rate) return;
  
  let interest = 0;
  let maturityAmount = 0;
  
  if (type === "deposit") {
    interest = (amount * rate / 100 * term) / 12;
    maturityAmount = amount + interest;
  } else {
    const monthlyRate = rate / 12 / 100;
    maturityAmount = amount * (((Math.pow(1 + monthlyRate, term) - 1) / monthlyRate) * (1 + monthlyRate));
    interest = maturityAmount - (amount * term);
  }
  
  const tax = interest * 0.154;
  const netInterest = interest - tax;
  
  document.getElementById("savingsInterest").textContent = formatNumber(netInterest);
  document.getElementById("savingsInterestBeforeTax").textContent = formatNumber(interest);
  document.getElementById("savingsMaturityAmount").textContent = formatNumber(maturityAmount);
  savingsResult.classList.remove("hidden");
}

savingsCalcBtn.addEventListener("click", calculateSavings);
savingsCopyBtn.addEventListener("click", () => {
  const text = `예상이자: ${document.getElementById("savingsInterest").textContent}, 세전이자: ${document.getElementById("savingsInterestBeforeTax").textContent}, 만기액: ${document.getElementById("savingsMaturityAmount").textContent}`;
  copyToClipboard(text);
});
savingsResetBtn.addEventListener("click", () => {
  savingsAmount.value = "";
  savingsTerm.value = "";
  savingsRate.value = "";
  savingsResult.classList.add("hidden");
});

savingsAmount.addEventListener("input", calculateSavings);
savingsTerm.addEventListener("input", calculateSavings);
savingsRate.addEventListener("input", calculateSavings);
savingsType.addEventListener("change", calculateSavings);

if (typeof renderRelatedByCategory === "function") {
  renderRelatedByCategory("relatedList", "cal", "savings", 5);
}
