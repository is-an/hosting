// ============ 텍스트 변환 도구 로직 ============

const textConvInput = document.getElementById("textConvInput");
const textConvOutput = document.getElementById("textConvOutput");
const textRemoveSpaceBtn = document.getElementById("textRemoveSpaceBtn");
const textRemoveLineBtn = document.getElementById("textRemoveLineBtn");
const textUpperBtn = document.getElementById("textUpperBtn");
const textLowerBtn = document.getElementById("textLowerBtn");
const textTrimBtn = document.getElementById("textTrimBtn");
const textReverseBtn = document.getElementById("textReverseBtn");
const textConvCopyBtn = document.getElementById("textConvCopyBtn");
const textConvResetBtn = document.getElementById("textConvResetBtn");

function updateOutput(text) {
  textConvOutput.value = text;
}

textRemoveSpaceBtn.addEventListener("click", () => {
  const result = textConvInput.value.replace(/\s/g, "");
  updateOutput(result);
});

textRemoveLineBtn.addEventListener("click", () => {
  const result = textConvInput.value.replace(/\n/g, " ");
  updateOutput(result);
});

textUpperBtn.addEventListener("click", () => {
  const result = textConvInput.value.toUpperCase();
  updateOutput(result);
});

textLowerBtn.addEventListener("click", () => {
  const result = textConvInput.value.toLowerCase();
  updateOutput(result);
});

textTrimBtn.addEventListener("click", () => {
  const result = textConvInput.value.split("\n").map(line => line.trim()).join("\n");
  updateOutput(result);
});

textReverseBtn.addEventListener("click", () => {
  const result = textConvInput.value.split("").reverse().join("");
  updateOutput(result);
});

textConvCopyBtn.addEventListener("click", () => {
  if (textConvOutput.value) {
    copyToClipboard(textConvOutput.value);
  }
});

textConvResetBtn.addEventListener("click", () => {
  textConvInput.value = "";
  textConvOutput.value = "";
});

if (typeof renderRelatedByCategory === "function") {
  renderRelatedByCategory("relatedList", "tools", "textconv", 5);
}
