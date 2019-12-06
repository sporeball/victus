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

class Primitive {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

class RectPrimitive extends Primitive {
  constructor(x, y, w, h, thickness, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.thickness = thickness;
    this.color = color;
  }
  
  draw(x, y) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
    
    if (this.thickness % 2) { // returns 1 if odd
      this.x = x + 0.5;
      this.y = y + 0.5;
    }
    
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.closePath();
    ctx.stroke();
  }
}

class FilledRectPrimitive extends Primitive {
  constructor(x, y, w, h, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
  }
  
  draw(x, y) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class EllipsePrimitive extends Primitive {
  constructor(x, y, w, h, thickness, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.thickness = thickness;
    this.color = color;
  }
  
  draw(x, y) {
    ctx.lineWidth = this.thickness;
    ctx.strokeStyle = this.color;
    
    if (this.thickness % 2) { // returns 1 if odd
      this.x = x + 0.5;
      this.y = y + 0.5;
    }
    
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
  }
}

class FilledEllipsePrimitive extends Primitive {
  constructor(x, y, w, h, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
  }
  
  draw(x, y) {
    ctx.fillStyle = this.color;
    
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}

class Sprite extends Primitive {
  constructor(sprite, x, y) {
    super(x, y);
    this.sprite = sprite;
    
    this.spriteData = new Image;
    this.spriteData.src = this.sprite;
  }
  
  draw(x, y) {
    ctx.drawImage(this.spriteData, x, y);
  }
}

clear = () => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, width, height);
}

exports.setup = setup;
exports.Primitive = Primitive;
exports.RectPrimitive = RectPrimitive;
exports.FilledRectPrimitive = FilledRectPrimitive;
exports.EllipsePrimitive = EllipsePrimitive;
exports.FilledEllipsePrimitive = FilledEllipsePrimitive;
exports.Sprite = Sprite;
exports.clear = clear;