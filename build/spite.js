var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "victus.min.js");

var file = fs.readFileSync(filePath, {encoding: "utf-8"}, function(){});

file = file.replace(/!0/g, "1");
file = file.replace(/!1/g, "0");
file = file.replace('("2d")', '`2d`');

file = "// victus | (c) 2021 sporeball & contributors | MIT license\n" + file.slice(0, file.length);

fs.writeFileSync(filePath, file);
