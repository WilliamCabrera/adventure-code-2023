import { processFileLineByLine } from "../utils/index.js";

const createMap = (data) => {
  let bigLine = "";
  data.forEach((element) => {
    if (element === "") {
      bigLine += "|";
    } else {
      bigLine += element + "*";
    }
  });

  const maps = bigLine.split("|").map((item) => {
    const split = item.split("*").filter((elem) => elem.length > 0);

    return split;
  });

  return maps;
};

const mapValue = (value, map) => {
  let result = -1;

  map.forEach((interval) => {
    const destRange = interval[0];
    const srcRange = interval[1];
    const lengthRange = interval[2];

    if (srcRange <= value && value < srcRange + lengthRange) {
      result = destRange + (value - srcRange);
    }
  });
  return result !== -1 ? result : value;
};

const findLocation = (seed, map) => {
  let value = seed;

  for (let index = 0; index < map.length; index++) {
    value = mapValue(value, map[index]);
  }
  return value;
};

const findLowerLocation = (map) => {
  const seeds = map[0][0]
    .split(":")[1]
    .split(" ")
    .filter((item) => item.length > 0)
    .map((item) => {
      return parseInt(item);
    });

  const newMap = map
    .slice(1, map.length)
    .map((item) => {
      return item.slice(1, item.length);
    })
    .map((newItem) => {
      return newItem.map((line) => {
        return line.split(" ").map((number) => parseInt(number));
      });
      //return newItem.split(" ").map((number) => parseInt(number));
    });

  const locationList = seeds.map((seed) => {
    return findLocation(seed, newMap);
  });

  const sorted = locationList.sort((a, b) => a - b);

  return sorted[0];
};

const findLowerLocationVersion2 = (map) => {
  const seeds = map[0][0]
    .split(":")[1]
    .split(" ")
    .filter((item) => item.length > 0)
    .map((item) => {
      return parseInt(item);
    });

  const newMap = map
    .slice(1, map.length)
    .map((item) => {
      return item.slice(1, item.length);
    })
    .map((newItem) => {
      return newItem.map((line) => {
        return line.split(" ").map((number) => parseInt(number));
      });
    });

  let lowest = 9999999999999999999999;
  for (let index = 1; index < seeds.length; index += 2) {
    const seed = seeds[index];
    const range = seeds[index + 1];
    let x = 0;
    console.log(`***started:${seed},${range}`);
    for (let index1 = seed; index1 < seed + range; index1++) {
      x = findLocation(index1, newMap);

      lowest = lowest > x ? x : lowest;
    }
    console.log(`***finshed: ${seed},${range} *** lowest: ${lowest}`);
  }

  console.log({ lowest });

  return lowest;
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day5Problem1 = async (path) => {
  const data = await processFileLineByLine(path);
  const map = createMap(data);

  return findLowerLocation(map);
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day5Problem2 = async (path) => {
  const data = await processFileLineByLine(path);
  const map = createMap(data);

  return findLowerLocationVersion2(map);
};
