// ============ 로또번호 생성 로직 ============

const generateBtn = document.getElementById("generateBtn");
const generateMultipleBtn = document.getElementById("generateMultipleBtn");
const lotteryDisplay = document.getElementById("lotteryDisplay");
const multipleNumbers = document.getElementById("multipleNumbers");
const lotteryResetBtn = document.getElementById("lotteryResetBtn");
const fixedSlots = Array.from(document.querySelectorAll(".fixed-slot"));

function getBallColor(number) {
  if (number >= 1 && number <= 10) return "#f4c542";
  if (number >= 11 && number <= 20) return "#3b82f6";
  if (number >= 21 && number <= 30) return "#ef4444";
  if (number >= 31 && number <= 40) return "#9ca3af";
  return "#22c55e";
}

function getFixedNumbers() {
  return fixedSlots.map((slot) => {
    const value = slot.value;
    return value === "" ? null : Number(value);
  });
}

function buildBall(number) {
  const color = getBallColor(number);
  return `<div class="lottery-ball" style="background:linear-gradient(145deg, rgba(255,255,255,0.22), ${color} 30%, ${color} 100%);">${number}</div>`;
}

function buildMiniBall(number) {
  const color = getBallColor(number);
  return `<span class="lottery-mini-ball" style="background:linear-gradient(145deg, rgba(255,255,255,0.22), ${color} 30%, ${color} 100%);">${number}</span>`;
}

function generateLotteryNumbers() {
  const fixedNumbers = getFixedNumbers();
  const hasFixedNumber = fixedNumbers.some((num) => num !== null);

  if (!hasFixedNumber) {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  const result = Array.from({ length: 6 }, () => null);
  const used = new Set();

  fixedNumbers.forEach((number, index) => {
    if (number !== null && !used.has(number)) {
      result[index] = number;
      used.add(number);
    }
  });

  while (result.includes(null)) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    if (used.has(randomNumber)) {
      continue;
    }

    const nextIndex = result.indexOf(null);
    result[nextIndex] = randomNumber;
    used.add(randomNumber);
  }

  return result;
}

function displayLotteryNumbers(numbers) {
  lotteryDisplay.innerHTML = numbers.map((num) => buildBall(num)).join("");
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
    html += `<div class="lottery-set"><strong>세트 ${i + 1}:</strong> <span class="lottery-mini-list">${numbers.map((num) => buildMiniBall(num)).join("")}</span></div>`;
  }
  
  multipleNumbers.innerHTML = html;
  lotteryDisplay.innerHTML = "";
}

function resetLottery() {
  fixedSlots.forEach((slot) => {
    slot.value = "";
  });
  lotteryDisplay.innerHTML = "";
  multipleNumbers.classList.add("hidden");
}

fixedSlots.forEach((slot) => {
  slot.addEventListener("change", () => {
    const currentValue = slot.value;
    const slotIndex = Number(slot.dataset.index);

    if (!currentValue) {
      return;
    }

    fixedSlots.forEach((otherSlot, index) => {
      if (index !== slotIndex && otherSlot.value === currentValue) {
        otherSlot.value = "";
      }
    });
  });
});

generateBtn.addEventListener("click", generateSingle);
generateMultipleBtn.addEventListener("click", generateMultiple);
lotteryResetBtn.addEventListener("click", resetLottery);

// 초기 한 번 생성
generateSingle();
