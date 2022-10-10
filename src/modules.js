import _ from "lodash-es";
import "lodash-es/upperCase.js";
import "lodash-es/shuffle.js";
import "lodash-es/range.js";

export function createRandom90Array() {
  let result = _.range(1, 91);
  result = _.shuffle(result);
  return result;
}

export function createRandom15Array() {
  let result = createRandom90Array();
  result = result.slice(0, 15);
  return result;
}
