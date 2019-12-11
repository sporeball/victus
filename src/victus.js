/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

var canvas, ctx, width, height, clearColor;

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
  
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  
  moveBy(x, y) {
    this.x += x;
    this.y += y;
  }
  
  clone() {
    return _c(this);
  }
  
  // private update function
  _u() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
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
    this._u();
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
    this._u();
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
    
    // image data
    this._d = new Image;
    this._d.src = this.sprite;
  }
  
  draw() {
    this._u();
    ctx.drawImage(this._d, this.x, this.y);
  }
}

text = (string, x, y, size = 16, color = "#000", font = "Arial", align = "left") => {
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
_c = parent => {
  var child, proto;
  
  if (typeof parent != 'object') {
    return parent;
  }
  
  proto = Object.getPrototypeOf(parent);
  child = Object.create(proto);

  for (var i in parent) {
    child[i] = _c(parent[i]);
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