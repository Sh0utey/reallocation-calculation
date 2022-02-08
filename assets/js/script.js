const allInputs = document.querySelectorAll("input");
const eurosInputs = document.querySelectorAll("input.euros");
const remainEurosDisplay = document.getElementById("remain-euros");
const eurosFundEurosDisplay = document.getElementById("euros-fund-euros");
const actionsEurosDisplay = document.getElementById("actions-euros");
const realEstateEurosDisplay = document.getElementById("real-estate-euros");
const exoticEurosDisplay = document.getElementById("exotic-euros");
const percentsInputs = document.querySelectorAll("input.percents");
const remainPercentsDisplay = document.getElementById("remain-percents");
const eurosFundPercentsDisplay = document.getElementById("euros-fund-percents");
const actionsPercentsDisplay = document.getElementById("actions-percents");
const realEstatePercentsDisplay = document.getElementById(
  "real-estate-percents"
);
const exoticPercentsDisplay = document.getElementById("exotic-percents");
const strategy = document.getElementById("strategy");
let totalEurosInput = 0;
let eurosFundEurosInput = 0;
let actionsEurosInput = 0;
let realEstateEurosInput = 0;
let exoticEurosInput = 0;
let eurosFundPercentsInput = 0;
let actionsPercentsInput = 0;
let realEstatePercentsInput = 0;
let exoticPercentsInput = 0;

const eurosToPercents = () => {
  eurosInputs.forEach((eurosInput) => {
    switch (eurosInput.id) {
      case "total-euros":
        totalEurosInput = eurosInput.value;
        break;
      case "euros-fund-euros":
        eurosFundEurosInput = eurosInput.value;
        eurosFundPercentsInput = (eurosFundEurosInput / totalEurosInput) * 100;
        eurosFundPercentsDisplay.value = eurosFundPercentsInput;
        break;
      case "actions-euros":
        actionsEurosInput = eurosInput.value;
        actionsPercentsInput = (actionsEurosInput / totalEurosInput) * 100;
        actionsPercentsDisplay.value = actionsPercentsInput;
        break;
      case "real-estate-euros":
        realEstateEurosInput = eurosInput.value;
        realEstatePercentsInput =
          (realEstateEurosInput / totalEurosInput) * 100;
        realEstatePercentsDisplay.value = realEstatePercentsInput;
        break;
      case "exotic-euros":
        exoticEurosInput = eurosInput.value;
        exoticPercentsInput = (exoticEurosInput / totalEurosInput) * 100;
        exoticPercentsDisplay.value = exoticPercentsInput;
        break;
      default:
        null;
    }
  });
};
const percentToEuros = () => {
  percentsInputs.forEach((percentsInput) => {
    switch (percentsInput.id) {
      case "euros-fund-percents":
        eurosFundPercentsInput = percentsInput.value;
        eurosFundEurosInput = (eurosFundPercentsInput * totalEurosInput) / 100;
        eurosFundEurosDisplay.value = eurosFundEurosInput;
        break;
      case "actions-percents":
        actionsPercentsInput = percentsInput.value;
        actionsEurosInput = (actionsPercentsInput * totalEurosInput) / 100;
        actionsEurosDisplay.value = actionsEurosInput;
        break;
      case "real-estate-percents":
        realEstatePercentsInput = percentsInput.value;
        realEstateEurosInput =
          (realEstatePercentsInput * totalEurosInput) / 100;
        realEstateEurosDisplay.value = realEstateEurosInput;
        break;
      case "exotic-percents":
        exoticPercentsInput = percentsInput.value;
        exoticEurosInput = (exoticPercentsInput * totalEurosInput) / 100;
        exoticEurosDisplay.value = exoticEurosInput;
        break;
      default:
        null;
    }
  });
};

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.className === "euros" && strategy.value === "custom") {
      eurosToPercents();
    } else if (input.className === "percents" && strategy.value === "custom") {
      percentToEuros();
    }
    remainEurosDisplay.value =
      totalEurosInput -
      eurosFundEurosInput -
      actionsEurosInput -
      realEstateEurosInput -
      exoticEurosInput;
    remainPercentsDisplay.value =
      100 -
      eurosFundPercentsInput -
      actionsPercentsInput -
      realEstatePercentsInput -
      exoticPercentsInput;
  });
});

strategy.addEventListener("input", () => {
  if (strategy.value === "defensive") {
    console.log("defensive");
    eurosFundPercentsInput = 100;
    actionsPercentsInput = 0;
    realEstatePercentsInput = 0;
    exoticPercentsInput = 0;
  } else if (strategy.value === "balanced") {
    console.log("balanced");
    eurosFundPercentsInput = 45;
    actionsPercentsInput = 25;
    realEstatePercentsInput = 25;
    exoticPercentsInput = 5;
  } else if (strategy.value === "offensive") {
    console.log("offensive");
    eurosFundPercentsInput = 20;
    actionsPercentsInput = 65;
    realEstatePercentsInput = 10;
    exoticPercentsInput = 5;
  } else {
    console.log("do math");
    eurosFundPercentsInput = eurosFundPercentsDisplay.value;
    actionsPercentsInput = actionsPercentsDisplay.value;
    realEstatePercentsInput = realEstatePercentsDisplay.value;
    exoticPercentsInput = exoticPercentsDisplay.value;
  }
});
