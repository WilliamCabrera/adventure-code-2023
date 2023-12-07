import { processFileLineByLine } from "../../utils/index.js";
const test = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

//only 12 red cubes, 13 green cubes, and 14 blue cubes

/**
 *
 * @param {*} line
 * @returns
 */
const powerOf = (line) => {
  const lineSplit = line.split(":");
  const quizz = lineSplit[1];
  const quizzList = quizz.split(";");
  const total = { blue: 0, red: 0, green: 0 };

  quizzList.forEach((test) => {
    const splitedQuizz = test.split(",");
    const game = { blue: 0, red: 0, green: 0 };
    splitedQuizz.forEach((quizz) => {
      const splitedItem = quizz.trim().split(" ");
      game[splitedItem[1]] += parseInt(splitedItem[0]);
    });

    total["blue"] = total["blue"] < game["blue"] ? game["blue"] : total["blue"];
    total["red"] = total["red"] < game["red"] ? game["red"] : total["red"];
    total["green"] =
      total["green"] < game["green"] ? game["green"] : total["green"];
  });

  return total["blue"] * total["red"] * total["green"];
};

/**
 *
 * @param {*} list
 * @returns
 */
const getSumOfPowerOf = (list) => {
  let sum = 0;
  list.forEach((game) => {
    sum += powerOf(game);
  });

  return sum;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Problem4 = async (path) => {
  const data = await processFileLineByLine(path);
  //only 12 red cubes, 13 green cubes, and 14 blue cubes

  /*  const testing = getSumOfPowerOf(test);
  console.log("*****tetsing", { testing }); */
  return getSumOfPowerOf(data);
};
