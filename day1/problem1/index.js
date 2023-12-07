import fs from "fs";
import readline from "readline";

import { processFileLineByLine, isNumber } from "../../utils/index.js";

/**
 *
 * @param {*} line
 * @returns
 */
const SeekFirstLastNumbers = (line) => {
  let startNumber = -1;
  let endNumber = -1;
  for (let index = 0; index < line.length; index++) {
    const chr1 = line[index];
    const chr2 = line[line.length - 1 - index];
    if (startNumber < 0 && isNumber(chr1)) startNumber = parseInt(chr1);
    if (endNumber < 0 && isNumber(chr2)) endNumber = parseInt(chr2);
  }

  //console.log("**** numbers", { startNumber, endNumber });

  return startNumber > 0 && endNumber > 0
    ? parseInt(`${startNumber}${endNumber}`)
    : 0;
};

/**
 *
 * @param {*} textlist
 * @returns
 */
export const getTotalFromList = (textlist) => {
  let total = 0;
  textlist.forEach((element) => {
    total += SeekFirstLastNumbers(element);
  });

  return total;
  /*  const sum = textlist.reduce((accumulator, currentValue) => {
    return SeekFirstLastNumbers(currentValue);
  }, 0); */
};

export const Problem1 = async (path) => {
  const data = await processFileLineByLine(path);

  return getTotalFromList(data);
};

//const test = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];

//console.log("****total**", getTotalFromList(test));
