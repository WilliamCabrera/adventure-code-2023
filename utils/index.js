import fs from "fs";
import readline from "readline";

/**
 *
 * @param {*} str
 * @returns
 */
export const isNumber = (str) => /[0-9]/.test(str);

export async function processFileLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let list = [];
  for await (const line of rl) {
    // Process each line here
    //console.log("Line:", line);
    list = [...list, line];
    // You can perform operations with each line within this loop
  }

  return list;
}
