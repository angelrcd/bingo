const newNumberButton = document.querySelector(".new-number-button");
const playerBoxes = document.querySelectorAll(".player .box");
const cpuBoxes = document.querySelectorAll(".cpu .box");

function createRandom90Array() {
  const result = _.range(1, 91);
  result = _.shuffle(result);
  return result;
}

console.log(createRandom90Array);
