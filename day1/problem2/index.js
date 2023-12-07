const stringNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const stringNumbersReplace = [
  "o1e",
  "t2o",
  "th3ee",
  "f4ur",
  "f5ve",
  "s6x",
  "se7en",
  "ei8ght",
  "n9ne",
];

import { processFileLineByLine, isNumber } from "../../utils/index.js";

/**
 *
 * @param {*} line
 * @param {*} subtring
 */
const getFirstAndLastOccurrence = (line, subtring) => {
  let indexes = [];
  for (let index = 0; index < line.length; index++) {
    const indexOf = line.indexOf(subtring, index);
    if (indexOf > -1) {
      indexes.push(indexOf);
    }
  }

  const minIndex = indexes.length > 0 ? Math.min(...indexes) : -1;
  const maxIndex = indexes.length > 0 ? Math.max(...indexes) : -1;

  return { minIndex, maxIndex };
};

const getFirstAndlastNumber = (line) => {
  let firstindex = line.length;
  let lastindex = -1;

  let firstValue = -1;
  let lastValue = -1;

  stringNumbers.forEach((stringNumber, index) => {
    const { minIndex, maxIndex } = getFirstAndLastOccurrence(
      line,
      stringNumber
    );

    if (minIndex > -1 && minIndex < firstindex) {
      firstindex = minIndex;
      firstValue = index + 1;
    }

    if (maxIndex > -1 && maxIndex > lastindex) {
      lastindex = maxIndex;
      lastValue = index + 1;
    }
  });

  return {
    firstindex: firstValue !== -1 ? firstindex : -1,
    firstValue,
    lastindex,
    lastValue,
  };
};

const SeekFirstLastNumbersOnly = (line) => {
  let startNumber = -1;
  let startIndex = -1;
  let endNumber = -1;
  let endIndex = -1;
  let realEndIndex = -1;
  for (let index = 0; index < line.length; index++) {
    const chr1 = line[index];
    const chr2 = line[line.length - 1 - index];
    if (startNumber < 0 && isNumber(chr1)) {
      startNumber = parseInt(chr1);
      startIndex = index;
    }
    if (endNumber < 0 && isNumber(chr2)) {
      endNumber = parseInt(chr2);
      endIndex = index;
      realEndIndex = line.length - 1 - index;
    }
  }

  return { startNumber, startIndex, endNumber, endIndex: realEndIndex };
};

const getDigits = (line) => {
  const res1 = getFirstAndlastNumber(line);
  const res2 = SeekFirstLastNumbersOnly(line);

  const { firstValue, firstindex, lastValue, lastindex } = res1;
  const { startNumber, startIndex, endNumber, endIndex } = res2;

  const items = [
    { value: firstValue, index: firstindex },
    { value: lastValue, index: lastindex },
    { value: startNumber, index: startIndex },
    { value: endNumber, index: endIndex },
  ];

  const filteredItems = items.filter((item) => item.index > -1);

  const sorted = filteredItems.sort(
    (item1, item2) => item1.index - item2.index
  );
  //console.log({ line, filteredItems, sorted });

  if (sorted.length === 0) {
    return 0;
  }

  if (sorted.length === 1) {
    return sorted[0].value;
  }

  return parseInt(`${sorted[0].value}${sorted[sorted.length - 1].value}`);
};

/**
 *
 * @param {*} list
 * @returns
 */
const computeValue = (list) => {
  let total = 0;

  list.forEach((line) => {
    total += getDigits(line);
  });

  return total;
};

const replacing = (line) => {
  //const newLine = line.replace("one", "o1e").replace("two", "t2o");

  let newLine = line;
  stringNumbers.forEach((strNumber, index) => {
    newLine = newLine.replace(strNumber, stringNumbersReplace[index]);
  });
  return newLine;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Problem2 = async (path) => {
  const data = await processFileLineByLine(path);

  //const newData = data.map((item) => replacing(item));
  //const shortSolution = getTotalFromList(newData);
  //console.log({ shortSolution });
  return computeValue(data);
  //return 1;
};

const test = () => {
  const testdata = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
  ];

  const res = computeValue(testdata);
  console.log("test", { res });
};
