import * as modules from "./modules.js";
import confetti from "canvas-confetti";

// selectores DOM
const newNumberButton = document.querySelector(".new-number-button");
const playerBoxes = document.querySelectorAll(".player .box");
const cpuBoxes = document.querySelectorAll(".cpu .box");
const allBoxes = document.querySelectorAll(".box");
const bottomContainerSelector = document.querySelector(".container-bottom");
const resetButtonSelector = document.querySelector(".reset-button");

//
let all90Numbers = modules.createRandom90Array();
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

function quitarTachados() {
  allBoxes.forEach(box => {
    box.classList.remove("tachado");
  });
}

function gameOver(victoryText) {
  newNumberButton.textContent = victoryText;
  newNumberButton.disabled = true;
  resetButtonSelector.classList.remove("hidden");
}

function removeCheckOnAllBoxes() {
  allBoxes.forEach(box => {
    box.classList.remove("check");
  });
  const miniboxes = document.querySelectorAll(".minibox");
  miniboxes.forEach(box => {
    box.classList.remove("check");
  });
}

function checkIfNumberCameOut(box) {
  const miniboxes = document.querySelectorAll(".minibox");
  miniboxes.forEach(minibox => {
    if (minibox.textContent === box.textContent) {
      minibox.classList.add("check");
    }
  });
  allBoxes.forEach(minibox => {
    if (minibox.textContent === box.textContent) {
      minibox.classList.add("check");
    }
  });
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
    confetti({
      particleCount: 100,

      spread: 160

    });
  }
  if (contarTachados(cpuBoxes) === 15) {
    gameOver("CPU WINS");
  }
  if (contarTachados(playerBoxes) === 15 && contarTachados(cpuBoxes) === 15) {
    gameOver("TIE");
  }
  console.log(all90Numbers);
});

resetButtonSelector.addEventListener("click", () => {
  all90Numbers = modules.createRandom90Array();
  playerCard = modules.createRandom15Array();
  playerCard = playerCard.sort((a, b) => a - b);
  cpuCard = modules.createRandom15Array();
  cpuCard = cpuCard.sort((a, b) => a - b);
  fillCard(playerBoxes, playerCard);
  fillCard(cpuBoxes, cpuCard);
  quitarTachados();
  removeCheckOnAllBoxes();
  newNumberButton.disabled = false;
  newNumberButton.textContent = "Click";
  bottomContainerSelector.innerHTML = "";
  resetButtonSelector.classList.add("hidden");
});

allBoxes.forEach(box => {
  box.addEventListener("click", () => {
    removeCheckOnAllBoxes();
    checkIfNumberCameOut(box);
  });
});

fillCard(playerBoxes, playerCard);
fillCard(cpuBoxes, cpuCard);
