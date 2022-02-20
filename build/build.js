/*
 build.js
 victus build file
 copyright (c) 2022 sporeball
 MIT license
*/

// dependencies
import fs from 'fs';
import { minify } from 'terser';
import chalk from 'chalk';

const CURRENT_YEAR = new Date().getFullYear();

let file = fs.readFileSync("src/victus.js", {encoding: "utf-8"}, () => {});
let prev = fs.readFileSync("build/victus.min.js", {encoding: "utf-8"}, () => {});

file = await minify(file); // terser object
file = file.code; // the code

// replacements not caught by terser
file = file.replace(/!0/g, "1");
file = file.replace(/!1/g, "0");
file = file.replace('("2d")', '`2d`');

// canvas context hash trick
const ctx = file.match(/let.+?,./).slice(-1); // find the letter the canvas context is under
file = file.replace(/e\.[^=,]+?\(/gm, match => {
  let key = match.slice(2, -1);
  return match.replace(key, key[0] + (key[6] || key[2]));
});

// copyright statement
file = `// victus | (c) ${CURRENT_YEAR} sporeball & contributors | MIT license\n${file.slice(0, file.length)}`;

fs.writeFileSync("build/victus.min.js", file);

// difference calculation
let diff = file.length - prev.length;
let diffString = `${diff >= 0 ? "+" : ""}${diff}B`;
if (diff < 0) { // size decrease
  diffString = chalk.green(diffString);
} else if (diff > 0) { // size increase
  diffString = chalk.red(diffString);
}

console.log(`${chalk.green("finished!")}\nbuild size: ${file.length}B (${diffString})\n`);
