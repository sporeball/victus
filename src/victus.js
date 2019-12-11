/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

var canvas, ctx, width, height, clearColor;

setup = obj => {
  canvas = document.getElementById(obj.id);
  ctx = canvas.getContext("2d");
  
  width = obj.width;
  height = obj.height;
  canvas.width = width;
  canvas.height = height;

  clearColor = obj.clearColor || "#fff";
}

// private primitive class
// all other primitives are derived from this
class _Primitive {
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

class Rect extends _Primitive {
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

class Ellipse extends _Primitive {
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

class Sprite extends _Primitive {
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

class Text extends _Primitive {
  constructor(string, x, y, size = 16, color = "#000", font = "Arial", align = "left") {
    super(x, y);
    this.string = string;
    this.size = size;
    this.color = color;
    this.font = font;
    this.align = align;
  }
  
  draw() {
    ctx.fillStyle = this.color;
    ctx.font = this.size + "px " + this.font;
    ctx.textAlign = this.align;
    ctx.fillText(this.string, this.x, this.y);
  }
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

  for (i in parent) {
    child[i] = _c(parent[i]);
  }

  return child;
}

exports.setup = setup;
exports.Rect = Rect;
exports.Ellipse = Ellipse;
exports.Sprite = Sprite;
exports.Text = Text;
exports.clear = clear;