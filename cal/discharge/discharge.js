// ============ 전역일 계산기 로직 ============

const enlistDate = document.getElementById("enlistDate");
const dischargeType = document.getElementById("dischargeType");
const customTermDiv = document.getElementById("customTermDiv");
const customTerm = document.getElementById("customTerm");
const dischargeCalcBtn = document.getElementById("dischargeCalcBtn");
const dischargeCopyBtn = document.getElementById("dischargeCopyBtn");
const dischargeResetBtn = document.getElementById("dischargeResetBtn");
const dischargeResult = document.getElementById("dischargeResult");

const dischargeTerm = {
  army: 18,
  navy: 20,
  airforce: 21,
  marine: 18
};

dischargeType.addEventListener("change", () => {
  if (dischargeType.value === "custom") {
    customTermDiv.style.display = "block";
  } else {
    customTermDiv.style.display = "none";
  }
});

function calculateDischarge() {
  if (!enlistDate.value) return;
  
  const enlist = new Date(enlistDate.value);
  let months = dischargeTerm[dischargeType.value];
  
  if (dischargeType.value === "custom") {
    months = parseFloat(customTerm.value) || 18;
  }
  
  const discharge = new Date(enlist.getFullYear(), enlist.getMonth() + months, enlist.getDate());
  const today = new Date();
  
  const diff = discharge - today;
  const remainingDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const totalDays = months * 30;
  const elapsedDays = totalDays - remainingDays;
  const progress = Math.min((elapsedDays / totalDays) * 100, 100).toFixed(1);
  
  document.getElementById("dischargeDate").textContent = formatDate(discharge);
  document.getElementById("remainingDays").textContent = `${Math.max(remainingDays, 0)}일`;
  document.getElementById("progressPercent").textContent = `${progress}%`;
  dischargeResult.classList.remove("hidden");
}

dischargeCalcBtn.addEventListener("click", calculateDischarge);
dischargeCopyBtn.addEventListener("click", () => {
  const text = `전역일: ${document.getElementById("dischargeDate").textContent}, 남은날: ${document.getElementById("remainingDays").textContent}, 진행률: ${document.getElementById("progressPercent").textContent}`;
  copyToClipboard(text);
});
dischargeResetBtn.addEventListener("click", () => {
  enlistDate.value = "";
  customTerm.value = "";
  dischargeResult.classList.add("hidden");
});

enlistDate.addEventListener("change", calculateDischarge);
dischargeType.addEventListener("change", calculateDischarge);
customTerm.addEventListener("input", calculateDischarge);
