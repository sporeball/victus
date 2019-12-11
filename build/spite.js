var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "victus.bundle.min.js");

var file = fs.readFileSync(filePath, {encoding: "utf-8"}, function(){});

file = (file.slice(0, 13) + "window.victus=t()" + file.slice(268, file.length));
file = file.slice(0, 191) + file.slice(270, file.length);
file = file.slice(0, 319) + file.slice(392, file.length);
file = file.slice(0, 105) + "return" + file.slice(191, file.length);
file = file.slice(0, 181) + file.slice(193, file.length);
fs.writeFileSync(filePath, file)