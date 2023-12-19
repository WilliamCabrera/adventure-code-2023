import { processFileLineByLine } from "../utils/index.js";

//=== problem 1 =======
const createMap = (data) => {
  // removing the 2 first element fo data
  data.shift();
  data.shift();

  const map = new Map();
  data.forEach((element) => {
    const line = element.replaceAll(" ", "");
    map.set(line.substring(0, 3), {
      left: line.substring(5, 8),
      right: line.substring(9, 12),
    });
  });

  return map;
};

const findTotalStepsToExit = (instructions, map, start, exit = "ZZZ") => {
  // Iterate over the map and get the first entry

  let currentValue = start;
  let currentNode = map.get(currentValue);

  let steps = 0;

  while (exit !== currentValue) {
    const instruction = instructions[steps % instructions.length];
    if (instruction === "L") {
      //console.log("*** L", { currentNode });
      currentValue = currentNode.left;
    } else {
      //console.log("*** R", { currentNode });
      currentValue = currentNode.right;
    }
    currentNode = map.get(currentValue);
    //console.log({ currentValue, exit, steps, instruction });
    steps += 1;
  }

  return steps;
};

const EndZ = (str) => str[2] === "Z";
const EndA = (str) => str[2] === "A";

const isAllZ = (items) => {
  const filter = items.filter((key) => EndZ(key));
  return items.length === filter.length;
};

const finTotalStepsToExitParallel = (instructions, map) => {
  let items = [...map.keys()].filter((key) => EndA(key));
  //let items1 = [...map.keys()].filter((key) => EndZ(key));
  let steps = 0;
  let tempList = [];
  let currentNode = null;
  let currentValue = "";

  while (!isAllZ(items)) {
    const instIndex = steps % instructions.length;
    const instruction = instructions[instIndex];

    //console.log("****** items:", items.length);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      currentNode = map.get(item);
      if (instruction === "L") {
        currentValue = currentNode.left;
      } else {
        currentValue = currentNode.right;
      }
      tempList.push(currentValue);
    }
    /*  items.forEach((item) => {
      currentNode = map.get(item);
      if (instruction === "L") {
        currentValue = currentNode.left;
      } else {
        currentValue = currentNode.right;
      }

      tempList.push(currentValue);
    }); */
    //console.log({ tempList });
    items = [...tempList];
    tempList = [];
    steps += 1;
  }
  return steps;
};

//=== problem 2 =======

/**
 *
 * @param {*} path
 * @returns
 */
export const Day8Problem1 = async (path) => {
  const data = await processFileLineByLine(path);
  const leftRightInstructions = data[0].trim();
  const map = createMap(data);
  //console.log({ map, leftRightInstructions });

  return findTotalStepsToExit(leftRightInstructions, map, "AAA");
};

/**
 *
 * @param {*} path
 * @returns
 */
export const Day8Problem2 = async (path) => {
  const data = await processFileLineByLine(path);
  const leftRightInstructions = data[0].trim();
  const map = createMap(data);

  return finTotalStepsToExitParallel(leftRightInstructions, map);
};
