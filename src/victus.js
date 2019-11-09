/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

var victus = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  framerate: undefined,
  clearColor: undefined
}

victus.setup = function(obj) {
  victus.canvas = document.getElementsByTagName("canvas")[0];
  victus.ctx = victus.canvas.getContext("2d");
  
  victus.width = obj.width;
  victus.height = obj.height;
  victus.canvas.width = victus.width;
  victus.canvas.height = victus.height;
  
  victus.framerate = obj.framerate;
  victus.clearColor = obj.clearColor;
}

victus.loop = function(method) {
  window.setInterval(method, 1000 / victus.framerate);
}

victus.drawRect = function(x, y, w, h, thickness, color) {
  victus.ctx.lineWidth = thickness;
  victus.ctx.strokeStyle = color;
  
  if (thickness % 2) { // returns 1 if odd
    x = x + 0.5;
    y = y + 0.5;
  }
  
  victus.ctx.beginPath();
  victus.ctx.rect(x, y, w, h);
  victus.ctx.closePath();
  victus.ctx.stroke();
}

victus.drawFilledRect = function(x, y, w, h, color) {
  victus.ctx.fillStyle = color;
  victus.ctx.fillRect(x, y, w, h);
}

victus.drawEllipse = function(x, y, w, h, thickness, color) {
  victus.ctx.lineWidth = thickness;
  victus.ctx.strokeStyle = color;
  
  if (thickness % 2) { // returns 1 if odd
    x = x + 0.5;
    y = y + 0.5;
  }
  
  victus.ctx.beginPath();
  victus.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  victus.ctx.closePath();
  victus.ctx.stroke();
}

victus.drawFilledEllipse = function(x, y, w, h, color) {
  victus.ctx.fillStyle = color;
  
  victus.ctx.beginPath();
  victus.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  victus.ctx.closePath();
  victus.ctx.fill();
}

victus.drawSprite = function(sprite, x, y) {
  victus.ctx.drawImage(sprite, x, y);
}

victus.clear = function() {
  victus.ctx.fillStyle = victus.clearColor;
  victus.ctx.fillRect(0, 0, victus.width, victus.height);
}