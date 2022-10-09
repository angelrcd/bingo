import _, { forEach } from "lodash-es";
import "lodash-es/upperCase.js";
import "lodash-es/shuffle.js";
import "lodash-es/range.js";
import * as modules from "./modules.js";

// selectores DOM
const newNumberButton = document.querySelector(".new-number-button");
const playerBoxes = document.querySelectorAll(".player .box");
const cpuBoxes = document.querySelectorAll(".cpu .box");
const bottomContainerSelector = document.querySelector(".container-bottom");

//
const all90Numbers = modules.createRandom90Array();
let playerCard = modules.createRandom15Array();
playerCard = playerCard.sort((a, b) => a - b);
let cpuCard = modules.createRandom15Array();
cpuCard = cpuCard.sort((a, b) => a - b);

function fillCard(selector, numbersToFill) {
  for (let i = 0; i < numbersToFill.length; i++) {
    selector[i].textContent = numbersToFill[i];
  }
}

function isNumberInCard(number, card) {
  card.forEach(element => {
    if (parseInt(element.textContent) === number) {
      element.classList.add("tachado");
      return true;
    }
  });
}

function contarTachados(card) {
  let count = 0;
  card.forEach(element => {
    if (element.classList.contains("tachado")) count++;
  });
  return count;
}

function gameOver(resultado) {
  newNumberButton.textContent = resultado;
  newNumberButton.disabled = true;
}

newNumberButton.addEventListener("click", () => {
  const a = all90Numbers.pop();
  newNumberButton.textContent = a;
  isNumberInCard(a, playerBoxes);
  isNumberInCard(a, cpuBoxes);
  console.log(contarTachados(playerBoxes));
  const boxDiv = document.createElement("div");
  boxDiv.className = "minibox";
  boxDiv.textContent = a;
  bottomContainerSelector.insertAdjacentElement("beforeend", boxDiv);
  if (contarTachados(playerBoxes) === 15) {
    gameOver("PLAYER WINS");
  }
  if (contarTachados(cpuBoxes) === 15) {
    gameOver("CPU WINS");
  }
  console.log(all90Numbers);
});

fillCard(playerBoxes, playerCard);
fillCard(cpuBoxes, cpuCard);
