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
  constructor(x, y, w, h, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class EllipsePrimitive extends Primitive {
  constructor(x, y, w, h, color) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.color = color;
  }
  
  draw() {
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
  
  draw() {
    ctx.drawImage(this.spriteData, this.x, this.y);
  }
}

clear = () => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, width, height);
}

exports.setup = setup;
exports.Primitive = Primitive;
exports.RectPrimitive = RectPrimitive;
exports.EllipsePrimitive = EllipsePrimitive;
exports.Sprite = Sprite;
exports.clear = clear;