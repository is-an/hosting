// ============ 로또번호 생성 로직 ============

const generateBtn = document.getElementById("generateBtn");
const generateMultipleBtn = document.getElementById("generateMultipleBtn");
const lotteryDisplay = document.getElementById("lotteryDisplay");
const multipleNumbers = document.getElementById("multipleNumbers");
const lotteryResetBtn = document.getElementById("lotteryResetBtn");

function generateLotteryNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayLotteryNumbers(numbers) {
  lotteryDisplay.innerHTML = numbers.map(num => `<div class="lottery-ball">${num}</div>`).join("");
}

function generateSingle() {
  const numbers = generateLotteryNumbers();
  displayLotteryNumbers(numbers);
  multipleNumbers.classList.add("hidden");
}

function generateMultiple() {
  multipleNumbers.classList.remove("hidden");
  let html = "";
  
  for (let i = 0; i < 5; i++) {
    const numbers = generateLotteryNumbers();
    html += `<div class="lottery-set"><strong>세트 ${i + 1}:</strong> ${numbers.join(", ")}</div>`;
  }
  
  multipleNumbers.innerHTML = html;
  lotteryDisplay.innerHTML = "";
}

function resetLottery() {
  lotteryDisplay.innerHTML = "";
  multipleNumbers.classList.add("hidden");
}

generateBtn.addEventListener("click", generateSingle);
generateMultipleBtn.addEventListener("click", generateMultiple);
lotteryResetBtn.addEventListener("click", resetLottery);

// 초기 한 번 생성
generateSingle();
