import { isNumber, processFileLineByLine } from "../utils/index.js";

const test = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

/**
 *
 * @param {*} line
 * @returns
 */
const getOccurrences = (line) => {
  const gameSplit = line.split(":");
  const cardSplit = gameSplit[1].split("|");

  const card = cardSplit[0]
    .trim()
    .split(" ")
    .map((item) => parseInt(item))
    .filter((value) => !isNaN(value));
  const mycard = cardSplit[1]
    .trim()
    .split(" ")
    .map((item) => parseInt(item))
    .filter((value) => !isNaN(value));

  let occurrences = 0;

  mycard.forEach((number) => {
    if (card.includes(number)) {
      occurrences += 1;
    }
  });

  return occurrences;
};

/**
 *
 * @param {*} line
 * @returns
 */
const getCardPoint = (line) => {
  const occurrences = getOccurrences(line);

  return occurrences > 0 ? Math.pow(2, occurrences - 1) : 0;
};

const getTotalScore = (data) => {
  return data.reduce((accumulator, currentValue) => {
    return accumulator + getCardPoint(currentValue);
  }, 0);
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day4Problem1 = async (path) => {
  const data = await processFileLineByLine(path);

  return getTotalScore(data);
};

const getTotalOfCards = (data) => {
  const occurrencesByCard = data.map((line, index) => ({
    index,
    occ: getOccurrences(line),
  }));

  for (let i = 0; i < occurrencesByCard.length; i++) {
    let _realOcc = 1;
    for (let index = 0; index < i; index++) {
      const { occ, realOcc } = occurrencesByCard[index];

      if (index + occ >= i) {
        _realOcc += realOcc;
      }
    }
    occurrencesByCard[i] = { ...occurrencesByCard[i], realOcc: _realOcc };
  }

  const sum = occurrencesByCard.reduce((accum, current) => {
    return accum + current.realOcc;
  }, 0);

  return sum;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day4Problem2 = async (path) => {
  const data = await processFileLineByLine(path);

  return getTotalOfCards(data);
};
