// ============ BMI 계산기 로직 ============

const bmiHeight = document.getElementById("bmiHeight");
const bmiWeight = document.getElementById("bmiWeight");
const bmiCalcBtn = document.getElementById("bmiCalcBtn");
const bmiCopyBtn = document.getElementById("bmiCopyBtn");
const bmiResetBtn = document.getElementById("bmiResetBtn");
const bmiResult = document.getElementById("bmiResult");

function calculateBmi() {
  const h = parseFloat(bmiHeight.value);
  const w = parseFloat(bmiWeight.value);
  
  if (!h || !w || h <= 0 || w <= 0) return;
  
  const bmi = w / ((h / 100) ** 2);
  let status = "";
  let statusClass = "";
  
  if (bmi < 18.5) {
    status = "저체중";
    statusClass = "underweight";
  } else if (bmi < 25) {
    status = "정상체중";
    statusClass = "normal";
  } else if (bmi < 30) {
    status = "과체중";
    statusClass = "overweight";
  } else {
    status = "비만";
    statusClass = "obese";
  }
  
  const minWeight = 18.5 * ((h / 100) ** 2);
  const maxWeight = 25 * ((h / 100) ** 2);
  
  document.getElementById("bmiValue").textContent = formatDecimal(bmi);
  document.getElementById("bmiStatus").innerHTML = `<p class="status ${statusClass}">${status}</p>`;
  document.getElementById("idealWeight").innerHTML = `<p>적정 체중: ${formatNumber(minWeight)}kg ~ ${formatNumber(maxWeight)}kg</p>`;
  bmiResult.classList.remove("hidden");
}

bmiCalcBtn.addEventListener("click", calculateBmi);
bmiCopyBtn.addEventListener("click", () => {
  const text = `BMI: ${document.getElementById("bmiValue").textContent}, ${document.querySelector(".status").textContent}`;
  copyToClipboard(text);
});
bmiResetBtn.addEventListener("click", () => {
  bmiHeight.value = "";
  bmiWeight.value = "";
  bmiResult.classList.add("hidden");
});

bmiHeight.addEventListener("input", calculateBmi);
bmiWeight.addEventListener("input", calculateBmi);
