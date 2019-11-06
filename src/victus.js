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

victus.drawSquare = function(x, y, l, color) {
  victus.ctx.fillStyle = color;
  victus.ctx.fillRect(x, y, l, l);
}

victus.drawCircle = function(x, y, r, color) {
  victus.ctx.fillStyle = color;
  victus.ctx.beginPath();
  victus.ctx.arc(x, y, r, 0, 2 * Math.PI);
  victus.ctx.fill();
}

victus.clear = function() {
  victus.ctx.fillStyle = victus.clearColor;
  victus.ctx.fillRect(0, 0, victus.width, victus.height);
}