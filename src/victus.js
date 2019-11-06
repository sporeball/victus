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
  clearColor: undefined
}

victus.setup = function(obj) {
  victus.canvas = document.getElementsByTagName("canvas")[0];
  victus.ctx = victus.canvas.getContext("2d");
  
  victus.width = obj.width;
  victus.height = obj.height;
  victus.canvas.width = victus.width;
  victus.canvas.height = victus.height;
  
  victus.clearColor = obj.clearColor;
}

victus.clear = function() {
  victus.ctx.fillStyle = victus.clearColor;
  victus.ctx.fillRect(0, 0, victus.width, victus.height);
}