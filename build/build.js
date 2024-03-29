/*
 build.js
 victus build file
 copyright (c) 2023 sporeball
 MIT license
*/

// dependencies
import fs from 'fs';
import { minify } from 'terser';
import crush from '@sporeball/node-crush';
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
const ctx = file.match(/let.+?,./)[0].slice(-1); // the letter assigned to the canvas context
file = file.replace(new RegExp(`(thi)?${ctx}\\.[^=,]+?\\(`, 'gm'), match => {
  // had to change the regex and add this block to fix a bug
  // where `this.hidden||this._()` was being interpreted as a key for the trick
  // because of the letter assigned to the canvas context being `s`
  if (match.startsWith('this')) {
    return match;
  }
  let key = match.slice(2, -1);
  return match.replace(key, key[0] + key[key.length - 2] + (key.length % 9));
});

// crush
file = crush(file);

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
