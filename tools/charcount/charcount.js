// ============ 글자수/바이트 계산기 로직 ============

const charCountText = document.getElementById("charCountText");
const charCountCopyBtn = document.getElementById("charCountCopyBtn");
const charCountResetBtn = document.getElementById("charCountResetBtn");

function updateCharCount() {
  const text = charCountText.value;
  const totalChars = text.length;
  const charsWithoutSpace = text.replace(/\s/g, "").length;
  const lineCount = text.split("\n").length;
  const byteCount = new TextEncoder().encode(text).length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  
  document.getElementById("totalChars").textContent = formatNumber(totalChars);
  document.getElementById("charsWithoutSpace").textContent = formatNumber(charsWithoutSpace);
  document.getElementById("lineCount").textContent = formatNumber(lineCount);
  document.getElementById("byteCount").textContent = formatNumber(byteCount);
  document.getElementById("wordCount").textContent = formatNumber(wordCount);
}

charCountText.addEventListener("input", updateCharCount);

charCountCopyBtn.addEventListener("click", () => {
  const text = `글자수: ${document.getElementById("totalChars").textContent}, 공백제외: ${document.getElementById("charsWithoutSpace").textContent}, 바이트: ${document.getElementById("byteCount").textContent}`;
  copyToClipboard(text);
});

charCountResetBtn.addEventListener("click", () => {
  charCountText.value = "";
  updateCharCount();
});

// 초기화
updateCharCount();
