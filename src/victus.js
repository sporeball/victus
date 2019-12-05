/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

var canvas = undefined;
var ctx = undefined;
var width = undefined;
var height = undefined;
var clearColor = undefined;

setup = obj => {
  canvas = document.getElementsByTagName("canvas")[0];
  ctx = canvas.getContext("2d");
  
  width = obj.width;
  height = obj.height;
  canvas.width = width;
  canvas.height = height;

  clearColor = obj.clearColor;
}

drawRect = (x, y, w, h, thickness, color) => {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  
  if (thickness % 2) { // returns 1 if odd
    x = x + 0.5;
    y = y + 0.5;
  }
  
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.stroke();
}

drawFilledRect = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

drawEllipse = (x, y, w, h, thickness, color) => {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  
  if (thickness % 2) { // returns 1 if odd
    x = x + 0.5;
    y = y + 0.5;
  }
  
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

drawFilledEllipse = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

drawSprite = (sprite, x, y) => {
  ctx.drawImage(sprite, x, y);
}

clear = () => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, width, height);
}

exports.setup = setup;
exports.drawRect = drawRect;
exports.drawFilledRect = drawFilledRect;
exports.drawEllipse = drawEllipse;
exports.drawFilledEllipse = drawFilledEllipse;
exports.drawSprite = drawSprite;
exports.clear = clear;