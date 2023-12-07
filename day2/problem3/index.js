import { processFileLineByLine } from "../../utils/index.js";

const test = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

//only 12 red cubes, 13 green cubes, and 14 blue cubes

const LIMIT = {
  blue: 14,
  green: 13,
  red: 12,
};

/**
 *
 * @param {*} line
 * @returns
 */
const isPossible = (line) => {
  const lineSplit = line.split(":");
  const quizz = lineSplit[1];
  const quizzList = quizz.split(";");

  const possibilityList = [true, true, true];
  quizzList.forEach((test, index) => {
    const splitedQuizz = test.split(",");
    let game = { blue: 0, red: 0, green: 0 };
    splitedQuizz.forEach((quizz) => {
      const splitedItem = quizz.trim().split(" ");
      game[splitedItem[1]] += parseInt(splitedItem[0]);
    });

    possibilityList[index] =
      LIMIT["blue"] >= game["blue"] &&
      LIMIT["red"] >= game["red"] &&
      LIMIT["green"] >= game["green"];
  });

  return possibilityList.filter((item) => !item).length === 0;
};

/**
 *
 * @param {*} list
 * @returns
 */
const getSumOfPossibleGameIndex = (list) => {
  let sum = 0;
  list.forEach((game, index) => {
    sum = isPossible(game) ? sum + index + 1 : sum;
  });

  return sum;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Problem3 = async (path) => {
  const data = await processFileLineByLine(path);
  //only 12 red cubes, 13 green cubes, and 14 blue cubes

  //const testing = getSumOfPossibleGameIndex(test);
  //console.log("*****tetsing", { testing });
  return getSumOfPossibleGameIndex(data);
};
