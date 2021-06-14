/*
 build.js
 victus build file
 copyright (c) 2021 sporeball
 MIT license
*/

// dependencies
const fs = require("fs");
const { minify } = require("terser");
const chalk = require("chalk");

let file = fs.readFileSync("src/victus.js", {encoding: "utf-8"}, () => {});
let prev = fs.readFileSync("build/victus.min.js", {encoding: "utf-8"}, () => {});

file = minify(file).code;

// replacements not caught by terser
file = file.replace(/!0/g, "1");
file = file.replace(/!1/g, "0");
file = file.replace('("2d")', '`2d`');

// copyright statement
file = "// victus | (c) 2021 sporeball & contributors | MIT license\n" + file.slice(0, file.length);

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
