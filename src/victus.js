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

  clearColor = obj.clearColor || "#fff";
}

class Primitive {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xVelocity = 0;
    this.yVelocity = 0;
  }
  
  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  
  moveBy(x, y) {
    this.x += x;
    this.y += y;
  }
  
  clone() {
    return _clone(this);
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
    this.update();
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
    this.update();
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
    this.update();
    ctx.drawImage(this.spriteData, this.x, this.y);
  }
}

text = (string, x, y, size = 16, font = "Arial", align = "left", color = "#000") => {
  ctx.font = size + "px " + font;
  ctx.textAlign = align;
  ctx.fillStyle = color;
  ctx.fillText(string, x, y);
}

clear = () => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, width, height);
}

// private clone function
// adapted from the clone package, by pvorb
_clone = parent => {
  var child, proto;
  
  if (typeof parent != 'object') {
    return parent;
  }
  
  proto = Object.getPrototypeOf(parent);
  child = Object.create(proto);

  for (var i in parent) {
    if (proto) {
      var attrs = Object.getOwnPropertyDescriptor(proto, i);
    }
    child[i] = _clone(parent[i]);
  }

  return child;
}

exports.setup = setup;
exports.Primitive = Primitive;
exports.RectPrimitive = RectPrimitive;
exports.EllipsePrimitive = EllipsePrimitive;
exports.Sprite = Sprite;
exports.text = text;
exports.clear = clear;