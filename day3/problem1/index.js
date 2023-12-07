import { isNumber, processFileLineByLine } from "../../utils/index.js";

const test = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

// problema 1
const validCharacter = (character) => character !== "." && !isNumber(character);

const detectPartsInLine = (upperLine, line, underLine) => {
  const list = [];

  const _upperLine = `${upperLine}.`;
  const _line = `${line}.`;
  const _underLine = `${underLine}.`;

  let startIndex = -1;
  let isPart = false;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];

    if (isNumber(character)) {
      startIndex = startIndex > -1 ? startIndex : index;
      if (upperLine) {
        if (
          (index > 0 && validCharacter(_upperLine[index - 1])) ||
          validCharacter(_upperLine[index]) ||
          (index < line.length - 1 && validCharacter(_upperLine[index + 1]))
        ) {
          isPart = true;
        }
      }
      if (underLine) {
        if (
          (index > 0 && validCharacter(_underLine[index - 1])) ||
          validCharacter(_underLine[index]) ||
          (index < line.length - 1 && validCharacter(_underLine[index + 1]))
        ) {
          isPart = true;
        }
      }

      if (
        (index > 0 && validCharacter(_line[index - 1])) ||
        (index < line.length - 1 && validCharacter(_line[index + 1]))
      ) {
        isPart = true;
      }

      if (index === line.length - 1) {
        const sub = `${line}.`.substring(startIndex, index + 1);
        const num = parseInt(sub);
        //console.log({ num, startIndex, index, sub, line });
        if (isPart) {
          list.push(num);
          isPart = false;
        }
      }
    } else {
      if (startIndex !== -1) {
        const sub = line.substring(startIndex, index);
        const num = parseInt(sub);
        //console.log({ num, startIndex, index, sub, line });
        startIndex = -1;
        if (isPart) {
          list.push(num);
        }
      }
      isPart = false;
    }
  }

  //console.log("***detectPartsInLine", { list, line, upperLine, underLine });
  return list;
};

const computeSum = (data) => {
  let list = [];
  for (let index = 0; index < data.length; index++) {
    const line = data[index];
    const upperLine = index > 0 ? data[index - 1] : null;
    const underLine = index < data.length - 1 ? data[index + 1] : null;

    const detectedPars = detectPartsInLine(upperLine, line, underLine);
    list = [...list, ...detectedPars];
  }

  return list.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day3Problem1 = async (path) => {
  const data = await processFileLineByLine(path);

  return computeSum(data);
};

// problema 2
const getNumberIndex = (line) => {
  const list = [];

  let startIndex = -1;
  for (let index = 0; index < line.length; index++) {
    const character = line[index];

    if (isNumber(character)) {
      startIndex = startIndex > -1 ? startIndex : index;

      if (index === line.length - 1) {
        const sub = `${line}.`.substring(startIndex, index + 1);
        const number = parseInt(sub);
        list.push({ startIndex, index, number });
      }
    } else {
      if (startIndex !== -1) {
        const sub = line.substring(startIndex, index);
        const number = parseInt(sub);
        list.push({ startIndex, index: index - 1, number });
        startIndex = -1;
      }
    }
  }

  return list;
};

const getAdjacents = (list, gearIndex) => {
  const filter = [];
  list.forEach((element) => {
    const { startIndex, index, number } = element;
    if (startIndex <= gearIndex && index >= gearIndex) {
      //console.log("*****number 1:", { number, startIndex, index, gearIndex });
      filter.push(element);
      return;
    }
    if (index - 1 === gearIndex || index + 1 === gearIndex) {
      //console.log("*****number 2:", { number, startIndex, index, gearIndex });
      filter.push(element);
      return;
    }
    if (startIndex - 1 === gearIndex || startIndex + 1 === gearIndex) {
      //console.log("*****number 3:", { number, startIndex, index, gearIndex });
      filter.push(element);
      return;
    }
  });
  const ratio = filter.length === 2 ? filter[0].number * filter[1].number : 0;
  //console.log("***filtered:", { f: filter.length === 2 ? filter : [] });
  return ratio;
};

const computeGearRationSum = (data) => {
  let total = 0;

  for (let index = 0; index < data.length; index++) {
    const line = data[index];
    const upperLine = index > 0 ? data[index - 1] : null;
    const underLine = index < data.length - 1 ? data[index + 1] : null;

    for (let index1 = 0; index1 < line.length; index1++) {
      const character = line[index1];
      if (character === "*") {
        const upperNumbers = upperLine ? getNumberIndex(upperLine) : [];
        const underNumbers = underLine ? getNumberIndex(underLine) : [];
        const lineNumbers = line ? getNumberIndex(line) : [];

        const adjRatio = getAdjacents(
          [...upperNumbers, ...underNumbers, ...lineNumbers],
          index1
        );

        total += adjRatio;
      }
    }
  }

  return total;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day3Problem2 = async (path) => {
  const data = await processFileLineByLine(path);

  return computeGearRationSum(data);
  //const x = detectPartsInLine("...*......", "..35..633.", "......#...");
};
