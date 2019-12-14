var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "victus.bundle.min.js");

var file = fs.readFileSync(filePath, {encoding: "utf-8"}, function(){});

file = (file.slice(0, 13) + "window.victus=t()" + file.slice(268, file.length));
file = file.slice(0, 191) + file.slice(270, file.length);
file = file.slice(0, 319) + file.slice(392, file.length);
file = file.slice(0, 105) + "return" + file.slice(191, file.length);
file = file.slice(0, 181) + file.slice(193, file.length);
file = file.slice(0, 85) + file.slice(112, file.length);
file = file.slice(0, 179) + ";" + file.slice(180, file.length);
file = file.slice(0, file.length - 21) + "}]},[1])(1)}));";
file = file.replace(/!0/g, "1");
file = file.replace(/!1/g, "0");
file = "// victus | (c) 2019 sporeball | MIT license\n" + file.slice(0, file.length);

fs.writeFileSync(filePath, file);