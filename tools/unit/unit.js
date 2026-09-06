// ============ 단위 변환기 로직 ============

const unitType = document.getElementById("unitType");
const unitFrom = document.getElementById("unitFrom");
const unitFromUnit = document.getElementById("unitFromUnit");
const unitTo = document.getElementById("unitTo");
const unitToUnit = document.getElementById("unitToUnit");
const unitSwapBtn = document.getElementById("unitSwapBtn");
const unitCopyBtn = document.getElementById("unitCopyBtn");
const unitResetBtn = document.getElementById("unitResetBtn");

const unitConversions = {
  length: {
    units: ["m", "cm", "mm", "km", "in", "ft"],
    to_m: { m: 1, cm: 0.01, mm: 0.001, km: 1000, in: 0.0254, ft: 0.3048 }
  },
  weight: {
    units: ["kg", "g", "mg", "lb", "oz"],
    to_kg: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 }
  },
  temperature: {
    units: ["°C", "°F", "K"],
    custom: true
  },
  area: {
    units: ["m²", "cm²", "km²", "in²", "ft²"],
    to_m2: { "m²": 1, "cm²": 0.0001, "km²": 1000000, "in²": 0.00064516, "ft²": 0.092903 }
  },
  volume: {
    units: ["L", "mL", "m³", "gal", "pt"],
    to_L: { L: 1, mL: 0.001, "m³": 1000, gal: 3.78541, pt: 0.473176 }
  },
  time: {
    units: ["s", "min", "h", "day"],
    to_s: { s: 1, min: 60, h: 3600, day: 86400 }
  },
  data: {
    units: ["B", "KB", "MB", "GB", "TB"],
    to_B: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
  }
};

function updateUnitOptions() {
  const type = unitType.value;
  const config = unitConversions[type];
  
  unitFromUnit.innerHTML = config.units.map(u => `<option>${u}</option>`).join("");
  unitToUnit.innerHTML = config.units.map(u => `<option>${u}</option>`).join("");
  
  if (config.units.length > 1) {
    unitToUnit.value = config.units[1];
  }
  
  convertUnit();
}

function convertUnit() {
  const type = unitType.value;
  const config = unitConversions[type];
  const fromVal = parseFloat(unitFrom.value) || 0;
  const fromUnit = unitFromUnit.value;
  const toUnit = unitToUnit.value;
  
  let toVal = 0;
  
  if (type === "temperature") {
    if (fromUnit === "°C" && toUnit === "°F") toVal = (fromVal * 9/5) + 32;
    else if (fromUnit === "°F" && toUnit === "°C") toVal = (fromVal - 32) * 5/9;
    else if (fromUnit === "°C" && toUnit === "K") toVal = fromVal + 273.15;
    else if (fromUnit === "K" && toUnit === "°C") toVal = fromVal - 273.15;
    else if (fromUnit === "°F" && toUnit === "K") toVal = (fromVal - 32) * 5/9 + 273.15;
    else if (fromUnit === "K" && toUnit === "°F") toVal = (fromVal - 273.15) * 9/5 + 32;
    else toVal = fromVal;
  } else {
    const baseKey = Object.keys(config)[1];
    const baseUnit = config[baseKey];
    toVal = fromVal * baseUnit[fromUnit] / baseUnit[toUnit];
  }
  
  unitTo.value = formatDecimal(toVal);
}

unitType.addEventListener("change", updateUnitOptions);
unitFromUnit.addEventListener("change", convertUnit);
unitToUnit.addEventListener("change", convertUnit);
unitFrom.addEventListener("input", convertUnit);

unitSwapBtn.addEventListener("click", () => {
  const temp = unitFromUnit.value;
  unitFromUnit.value = unitToUnit.value;
  unitToUnit.value = temp;
  convertUnit();
});

unitCopyBtn.addEventListener("click", () => {
  const text = `${unitFrom.value} ${unitFromUnit.value} = ${unitTo.value} ${unitToUnit.value}`;
  copyToClipboard(text);
});

unitResetBtn.addEventListener("click", () => {
  unitFrom.value = "";
  unitTo.value = "";
});

updateUnitOptions();

if (typeof renderRelatedByCategory === "function") {
  renderRelatedByCategory("relatedList", "tools", "unit", 5);
}
