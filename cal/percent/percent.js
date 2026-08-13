// ============ 퍼센트 계산기 로직 ============

// 탭 초기화
initCalcTabButtons();

const percentCalcBtn = document.getElementById("percentCalcBtn");
const percentCopyBtn = document.getElementById("percentCopyBtn");
const percentResetBtn = document.getElementById("percentResetBtn");

function calculatePercent() {
  const activeTab = document.querySelector(".calc-tab-content.active");
  const tabId = activeTab.id;
  let result = "";
  
  if (tabId === "percent-of") {
    const a = parseFloat(document.getElementById("percentOf_a").value);
    const b = parseFloat(document.getElementById("percentOf_b").value);
    if (!isNaN(a) && !isNaN(b)) {
      const res = (a * b) / 100;
      result = `${formatNumber(a)}의 ${b}% = ${formatNumber(res)}`;
      document.getElementById("percentOf_result").textContent = result;
    }
  } else if (tabId === "percent-is") {
    const a = parseFloat(document.getElementById("percentIs_a").value);
    const b = parseFloat(document.getElementById("percentIs_b").value);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      const res = (a / b) * 100;
      result = `${formatNumber(a)}는 ${formatNumber(b)}의 ${formatDecimal(res)}%`;
      document.getElementById("percentIs_result").textContent = result;
    }
  } else if (tabId === "percent-increase") {
    const from = parseFloat(document.getElementById("increase_from").value);
    const to = parseFloat(document.getElementById("increase_to").value);
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      const res = ((to - from) / from) * 100;
      result = `${formatNumber(from)}에서 ${formatNumber(to)}로 증가 = ${formatDecimal(res)}%`;
      document.getElementById("increase_result").textContent = result;
    }
  } else if (tabId === "percent-decrease") {
    const from = parseFloat(document.getElementById("decrease_from").value);
    const to = parseFloat(document.getElementById("decrease_to").value);
    if (!isNaN(from) && !isNaN(to) && from !== 0) {
      const res = ((from - to) / from) * 100;
      result = `${formatNumber(from)}에서 ${formatNumber(to)}로 감소 = ${formatDecimal(res)}%`;
      document.getElementById("decrease_result").textContent = result;
    }
  }
}

function resetPercent() {
  document.querySelectorAll("#percent-of input, #percent-is input, #percent-increase input, #percent-decrease input").forEach(inp => inp.value = "");
  document.querySelectorAll(".result-display").forEach(el => el.textContent = "");
}

percentCalcBtn.addEventListener("click", calculatePercent);
percentCopyBtn.addEventListener("click", () => {
  const activeTab = document.querySelector(".calc-tab-content.active");
  const result = activeTab.querySelector(".result-display").textContent;
  if (result) copyToClipboard(result);
});
percentResetBtn.addEventListener("click", resetPercent);

// 실시간 계산
document.getElementById("percentOf_a").addEventListener("input", calculatePercent);
document.getElementById("percentOf_b").addEventListener("input", calculatePercent);
document.getElementById("percentIs_a").addEventListener("input", calculatePercent);
document.getElementById("percentIs_b").addEventListener("input", calculatePercent);
document.getElementById("increase_from").addEventListener("input", calculatePercent);
document.getElementById("increase_to").addEventListener("input", calculatePercent);
document.getElementById("decrease_from").addEventListener("input", calculatePercent);
document.getElementById("decrease_to").addEventListener("input", calculatePercent);
