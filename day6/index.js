import { isNumber, processFileLineByLine } from "../utils/index.js";

const getCombinations = (time, distance) => {
  let counter = 0;
  const length = Math.floor(time / 2);

  for (let index = 1; index < time; index++) {
    if (distance < index * (time - index)) {
      counter += 1;
    }
  }
  return counter;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day6Problem1 = async (path) => {
  const data = await processFileLineByLine(path);
  const split = data.map((lines) => {
    const temp = lines.split(":");
    const newList = temp.slice(1, temp.length).map((line) => {
      return line
        .trim()
        .split(" ")
        .filter((item) => isNumber(item))
        .map((number) => parseInt(number));
    });

    return newList;
  });
  const zippedList = split[0][0].map((number, index) => [
    number,
    split[1][0][index],
  ]);

  const result = zippedList.map((item) => {
    return getCombinations(item[0], item[1]);
  });

  const product = result.reduce((acc, currentvalue) => {
    return acc * currentvalue;
  }, 1);

  //console.log(product);

  return product;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day6Problem2 = async (path) => {
  const data = await processFileLineByLine(path);
  const split = data.map((lines) => {
    const temp = lines.split(":");

    const newList = temp.slice(1, temp.length).map((line) => {
      return parseInt(line.replaceAll(" ", ""));
    });

    return newList;
  });

  const time = split[0][0];
  const distance = split[1][0];
  return getCombinations(time, distance);
};
