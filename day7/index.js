import { isNumber, processFileLineByLine } from "../utils/index.js";

const regex = /^(?:[^A]*A){5}[^A]*$/;

/**
 *  card types
 *  1 - Five of a kind
 *  2 - Four of a kind
 *  3 - Full house
 *  4- Three of a kind
 *  5- Two pair
 *  6- One pair
 *  7- High card
 */

const table = { A: 20, K: 19, Q: 18, J: 17, T: 16 };
const table2 = { A: 20, K: 19, Q: 18, J: 1, T: 16 };

/**
 *
 * @param {*} data
 * @returns
 */

const parseToCards = (data, typeFunc) =>
  data.map((line) => {
    const split = line.split(" ");
    return {
      label: split[0],
      bid: parseInt(split[1]),
      type: typeFunc(split[0].trim()),
    };
  });

const decodeCard = (label) => {
  let presence = "";
  let occurrences = [];
  let occIndex = -1;
  for (let index = 0; index < label.length; index++) {
    const character = label[index];
    if (!presence.includes(character)) {
      occIndex += 1;
      occurrences.push(1);
      presence += character;
    } else {
      occurrences[presence.indexOf(character)] += 1;
    }
  }

  return { occurrences, presence };
};

const decodeCard2 = (label) => {
  let presence = "";
  let occurrences = [];
  let occIndex = -1;
  let jokerCount = 0;
  for (let index = 0; index < label.length; index++) {
    const character = label[index];
    if (character === "J") {
      jokerCount += 1;
    } else {
      if (!presence.includes(character)) {
        occIndex += 1;
        occurrences.push(1);
        presence += character;
      } else {
        occurrences[presence.indexOf(character)] += 1;
      }
    }
  }

  let bigggest = occurrences[0];
  let biggestChar = isNumber(presence[0])
    ? parseInt(presence[0])
    : table2[presence[0]];
  let biggestIndex = 0;

  for (let index = 1; index < occurrences.length; index++) {
    const tempVal = isNumber(presence[index])
      ? parseInt(presence[index])
      : table2[presence[index]];
    if (bigggest < occurrences[index]) {
      bigggest = occurrences[index];
      biggestIndex = index;
    }
    if (bigggest === occurrences[index] && tempVal > biggestChar) {
      bigggest = occurrences[index];
      biggestIndex = index;
      biggestChar = isNumber(presence[index])
        ? parseInt(presence[index])
        : table2[presence[index]];
    }
  }

  //console.log({ label, biggestIndex, presence, occurrences });

  occurrences[biggestIndex] += jokerCount;

  return { occurrences, presence };
};

const isFiveKind = (occurrences) => occurrences.length === 1;

const isFourKind = (occurrences) =>
  occurrences.length === 2 && occurrences.includes(4);

const isFullHouse = (occurrences) =>
  occurrences.length === 2 && occurrences.includes(2);

const isThreeKind = (occurrences) =>
  occurrences.length === 3 && occurrences.includes(3);

const isTwoPair = (occurrences) =>
  occurrences.length === 3 && occurrences.includes(2);

const isOnePair = (occurrences) =>
  occurrences.length === 4 && occurrences.includes(2);

const isHighCard = (occurrences) => occurrences.length === 5;

const getCardType = (card) => {
  const { occurrences } = decodeCard(card);

  if (isFiveKind(occurrences)) return 1;
  if (isFourKind(occurrences)) return 2;
  if (isFullHouse(occurrences)) return 3;
  if (isThreeKind(occurrences)) return 4;
  if (isTwoPair(occurrences)) return 5;
  if (isOnePair(occurrences)) return 6;
  if (isHighCard(occurrences)) return 7;

  return 8;
};
const getCardType2 = (card) => {
  const { occurrences } = decodeCard2(card);

  if (isFiveKind(occurrences)) return 1;
  if (isFourKind(occurrences)) return 2;
  if (isFullHouse(occurrences)) return 3;
  if (isThreeKind(occurrences)) return 4;
  if (isTwoPair(occurrences)) return 5;
  if (isOnePair(occurrences)) return 6;
  if (isHighCard(occurrences)) return 7;

  return 8;
};

const compareCards = (card1, card2) => {
  if (card1.type < card2.type) {
    return card1.type - card2.type;
  }
  if (card1.type > card2.type) {
    return card1.type - card2.type;
  }
  if (card1.type === card2.type) {
    const { label: label1 } = card1;
    const { label: label2 } = card2;
    for (let index = 0; index < label1.length; index++) {
      const char1 = label1[index];
      const char2 = label2[index];
      if (char1 !== char2) {
        const value1 = isNumber(char1) ? parseInt(char1) : table[char1];
        const value2 = isNumber(char2) ? parseInt(char2) : table[char2];
        return value2 - value1;
      }
    }

    return card1.type - card2.type;
  }
};

const compareCards2 = (card1, card2) => {
  if (card1.type < card2.type) {
    return card1.type - card2.type;
  }
  if (card1.type > card2.type) {
    return card1.type - card2.type;
  }
  if (card1.type === card2.type) {
    const { label: label1 } = card1;
    const { label: label2 } = card2;
    for (let index = 0; index < label1.length; index++) {
      const char1 = label1[index];
      const char2 = label2[index];
      if (char1 !== char2) {
        const value1 = isNumber(char1) ? parseInt(char1) : table2[char1];
        const value2 = isNumber(char2) ? parseInt(char2) : table2[char2];
        return value2 - value1;
      }
    }

    return card1.type - card2.type;
  }
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day7Problem1 = async (path) => {
  const data = await processFileLineByLine(path);

  const cards = parseToCards(data, getCardType);
  const sortedcards = cards.sort(compareCards);

  const newList = sortedcards.map((card, index) => ({
    ...card,
    rank: sortedcards.length - index,
    win: card.bid * (sortedcards.length - index),
  }));

  return newList.reduce((acc, currentValue) => {
    return acc + currentValue.win;
  }, 0);
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day7Problem2 = async (path) => {
  const data = await processFileLineByLine(path);
  const cards = parseToCards(data, getCardType2);
  const sortedcards = cards.sort(compareCards2);

  const newList = sortedcards.map((card, index) => ({
    ...card,
    rank: sortedcards.length - index,
    win: card.bid * (sortedcards.length - index),
  }));

  //console.log({ newList });

  return newList.reduce((acc, currentValue) => {
    return acc + currentValue.win;
  }, 0);
};
