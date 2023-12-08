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

const findTotalStepsToExit = (instructions, map, exit = "ZZZ") => {
  // Iterate over the map and get the first entry
  const firstEntry = map.entries().next().value;
  //console.log({ instructions, map });

  let currentNode = firstEntry[1];

  let steps = 0;
  let index = 0;

  do {
    const instruction = instructions[index];
    steps += 1;
    //console.log({ instruction, currentNode, exit });

    if (instruction === "L") {
      console.log("*** L", { currentNode });
      if (currentNode.left === exit) {
        break;
      }
      currentNode = map.get(currentNode.left);
    } else {
      console.log("*** R", { currentNode });
      if (currentNode.right === exit) {
        break;
      }
      currentNode = map.get(currentNode.right);
    }

    index += 1;
    if (index === instructions.length) {
      //index = 0;
      console.log({ steps, currentNode });
    }
  } while (index < instructions.length);

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

  return findTotalStepsToExit(leftRightInstructions, map);
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

  return 0;
};
