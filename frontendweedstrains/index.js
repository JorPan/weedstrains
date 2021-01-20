const APIKey = "4nX8ujH";
const searchParams = new URLSearchParams(window.location.search);
const search = searchParams.get("search");

let positiveEffects = [];
let medicalEffects = [];
let negativeEffects = [];
let effectsURL = `http://strainapi.evanbusse.com/${APIKey}/searchdata/effects`;

// if (search) {
//   effectsurl = `http://localhost:3001/strains?search=${search}`;
//   fetch(effectsURL).then(((response) => response.json()).then(console.log));
// }

fetch(effectsURL)
  .then((response) => response.json())
  .then((effects) => {
    filterPositiveEffects(effects);
    filterMedicalEffects(effects);
    filterNegativeEffects(effects);
    showPositiveEffects(positiveEffects);
    showMedicalEffects(medicalEffects);
    showNegativeEffects(negativeEffects);
  });

function filterPositiveEffects(effects) {
  effects.forEach((effect) => {
    if (effect.type == "positive") {
      positiveEffects.push(effect);
    }
  });
}

function showPositiveEffects(positiveEffects) {
  let positiveDiv = document.querySelector("#positive-div");
  let effectsection = document.querySelector("#fieldset");

  positiveEffects.forEach((effect) => {
    let option = document.createElement("input");
    let label = document.createElement("label");
    let linebreak = document.createElement("br");
    option.classList.add("selectableEffect");
    option.type = "checkbox";
    label = effect["effect"];
    option.setAttribute("name", `${label}-effect-positive`);
    option.id = label;
    // label.for = label;
    positiveDiv.append(option);
    positiveDiv.append(label);
    positiveDiv.append(linebreak);
  });
  effectsection.append(positiveDiv);
}

function filterMedicalEffects(effects) {
  effects.forEach((effect) => {
    if (effect.type == "medical") {
      medicalEffects.push(effect);
    }
  });
}

function showMedicalEffects(medicalEffects) {
  let medicalDiv = document.querySelector("#medical-div");
  let effectsection = document.querySelector("#fieldset");

  medicalEffects.forEach((effect) => {
    let option = document.createElement("input");
    let label = document.createElement("label");
    let linebreak = document.createElement("br");
    option.classList.add("selectableEffect");
    option.type = "checkbox";
    label = effect["effect"];
    option.setAttribute("name", `${label}-effect-medical`);
    option.id = label;
    medicalDiv.append(option);
    medicalDiv.append(label);
    medicalDiv.append(linebreak);
  });
  effectsection.append(medicalDiv);
}

function filterNegativeEffects(effects) {
  effects.forEach((effect) => {
    if (effect.type == "negative") {
      negativeEffects.push(effect);
    }
  });
}

function showNegativeEffects(negativeEffects) {
  let negativeDiv = document.querySelector("#negative-div");
  let effectsection = document.querySelector("#fieldset");

  negativeEffects.forEach((effect) => {
    let option = document.createElement("input");
    let label = document.createElement("label");
    let linebreak = document.createElement("br");
    option.classList.add("selectableEffect");
    option.type = "checkbox";
    label = effect["effect"];
    option.setAttribute("name", `${label}-effect-negative`);
    option.id = label;
    negativeDiv.append(option);
    negativeDiv.append(label);
    negativeDiv.append(linebreak);
  });
  effectsection.append(negativeDiv);
}

const params = new URLSearchParams(window.location.search);
let mySearchParams = params.get("strains");

let effectForm = document.querySelector("#effects-form");
effectForm.addEventListener("submit", getCheckedOptions);

function getCheckedOptions(event) {
  checkedOptions = document.querySelectorAll("input[type=checkbox]:checked");
  getStrings(checkedOptions);
}

let desiredEffects = [];

function getStrings(checkedOptions) {
  return Array.from(checkedOptions).map((element) => {
    desiredEffects.push(element.name);
  });
}

// fetch("http://localhost:3000/joiners")
//   .then((response) => response.json())
//   .then(console.log);
