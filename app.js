import express from "express";
const app = express();
const PORT = 3000;

import { Problem1 } from "./day1/problem1/index.js";
import { Problem2 } from "./day1/problem2/index.js";
import { Problem3 } from "./day2/problem3/index.js";
import { Problem4 } from "./day2/problem4/index.js";
import { Day3Problem1, Day3Problem2 } from "./day3/problem1/index.js";
import { Day4Problem1, Day4Problem2 } from "./day4/index.js";
import { Day5Problem1, Day5Problem2 } from "./day5/index.js";

// Start the server
app.listen(PORT, async () => {
  const p1 = await Problem1("./day1/problem1/data.txt");
  console.log("****** :", { p1 });

  const p2 = await Problem2("./day1/problem1/data.txt");
  console.log("****** :", { p2 });

  const p3 = await Problem3("./day2/problem3/data.txt");
  console.log("****** :", { p3 });

  const p4 = await Problem4("./day2/problem4/data.txt");
  console.log("****** :", { p4 });

  const day3p1 = await Day3Problem1("./day3/problem1/data.txt");
  console.log("****** :", { day3p1 });

  const day3p2 = await Day3Problem2("./day3/problem1/data.txt");
  console.log("****** :", { day3p2 });

  const day4p1 = await Day4Problem1("./day4/data.txt");
  console.log("****** :", { day4p1 });

  const day4p2 = await Day4Problem2("./day4/data.txt");
  console.log("****** :", { day4p2 });

  /*  const day5p1 = await Day5Problem1("./day5/data.txt");
  console.log("****** :", { day5p1 }); */

  //commented since it takes too long to finish
  //const day5p2 = await Day5Problem2("./day5/data.txt");
  //console.log("****** :", { day5p2 });
});
