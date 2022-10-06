import _ from "lodash-es";
import "lodash-es/upperCase.js";
import "lodash-es/shuffle.js";
import "lodash-es/range.js";
import * as modules from "./modules.js";

// selectores DOM
const newNumberButton = document.querySelector(".new-number-button");
const playerBoxes = document.querySelectorAll(".player .box");
const cpuBoxes = document.querySelectorAll(".cpu .box");

//
const playerCard = modules.createRandom15Array();
const cpuCard = modules.createRandom15Array();

function fillCard(selector, numbersToFill) {
  for (let i = 0; i < numbersToFill.length; i++) {
    selector[i].textContent = numbersToFill[i];
  }
}

fillCard(playerBoxes, playerCard);
fillCard(cpuBoxes, cpuCard);
