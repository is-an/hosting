// ============ 부가세 계산기 로직 ============

initCalcTabButtons();

const vatCalcBtn = document.getElementById("vatCalcBtn");
const vatCopyBtn = document.getElementById("vatCopyBtn");
const vatResetBtn = document.getElementById("vatResetBtn");

function calculateVat() {
  const activeTab = document.querySelector(".calc-tab-content.active");
  const tabId = activeTab.id;
  
  if (tabId === "vat-forward") {
    const supply = parseFloat(document.getElementById("vatSupply").value) || 0;
    const rate = parseFloat(document.getElementById("vatRate").value) || 0;
    const vat = supply * (rate / 100);
    const total = supply + vat;
    
    document.getElementById("vatSupplyResult").textContent = formatNumber(supply);
    document.getElementById("vatAmountResult").textContent = formatNumber(vat);
    document.getElementById("vatTotalResult").textContent = formatNumber(total);
  } else {
    const total = parseFloat(document.getElementById("vatTotal").value) || 0;
    const rate = parseFloat(document.getElementById("vatRateReverse").value) || 0;
    const supply = total / (1 + rate / 100);
    const vat = total - supply;
    
    document.getElementById("vatTotalReverseResult").textContent = formatNumber(total);
    document.getElementById("vatSupplyReverseResult").textContent = formatNumber(supply);
    document.getElementById("vatAmountReverseResult").textContent = formatNumber(vat);
  }
}

vatCalcBtn.addEventListener("click", calculateVat);
vatCopyBtn.addEventListener("click", () => {
  const activeTab = document.querySelector(".calc-tab-content.active");
  const rows = activeTab.querySelectorAll(".result-row");
  let text = "";
  rows.forEach(row => {
    const label = row.querySelector("span").textContent;
    const value = row.querySelectorAll("span")[1].textContent;
    text += `${label}: ${value}\n`;
  });
  copyToClipboard(text);
});
vatResetBtn.addEventListener("click", () => {
  document.getElementById("vatSupply").value = "";
  document.getElementById("vatRate").value = "10";
  document.getElementById("vatTotal").value = "";
  document.getElementById("vatRateReverse").value = "10";
  calculateVat();
});

document.getElementById("vatSupply").addEventListener("input", calculateVat);
document.getElementById("vatRate").addEventListener("input", calculateVat);
document.getElementById("vatTotal").addEventListener("input", calculateVat);
document.getElementById("vatRateReverse").addEventListener("input", calculateVat);

calculateVat();
