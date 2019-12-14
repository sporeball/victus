/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

var canvas, ctx, w, h, color, interacted;

setup = obj => {
  canvas = document.getElementById(obj.id);
  ctx = canvas.getContext("2d");
  
  w = obj.w;
  h = obj.h;
  canvas.width = w;
  canvas.height = h;

  color = obj.color || "#fff";
}

// private primitive class
// most other primitives are derived from this
class Primitive {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xv = 0;
    this.yv = 0;
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
    return c(this);
  }
  
  // private update function
  u() {
    this.x += this.xv;
    this.y += this.yv;
  }
}

class Rect extends Primitive {
  constructor(x, y, w, h, col) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.col = col;
  }
  
  draw() {
    this.u();
    ctx.fillStyle = this.col;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

class Ellipse extends Primitive {
  constructor(x, y, w, h, col) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.col = col;
  }
  
  draw() {
    this.u();
    ctx.fillStyle = this.col;
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
    this.d = new Image;
    this.d.src = this.sprite;
  }
  
  draw() {
    this.u();
    ctx.drawImage(this.d, this.x, this.y);
  }
}

class Text extends Primitive {
  constructor(str, x, y, size = 16, col = "#000", font = "Arial", align = "left") {
    super(x, y);
    this.str = str;
    this.size = size;
    this.col = col;
    this.font = font;
    this.align = align;
  }
  
  draw() {
    ctx.fillStyle = this.col;
    ctx.font = this.size + "px " + this.font;
    ctx.textAlign = this.align;
    ctx.fillText(this.str, this.x, this.y);
  }
}

class Sound {
  constructor(snd, vol, loop=0) {
    this.snd = snd;
    this.vol = vol;
    
    this.d = new Audio(this.snd);
    this.d.loop = loop;
  }

  reset() {
    this.d.load();
  }

  play() {
    if (!interacted) return;
    this.reset();
    this.d.volume = this.vol;
    this.d.play();
  }

  pause() {
    this.d.pause();
  }
}

clear = () => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
}

// private clone function
// adapted from the clone package, by pvorb
c = parent => {
  var child, proto;
  
  if (typeof parent != 'object') {
    return parent;
  }
  
  proto = Object.getPrototypeOf(parent);
  child = Object.create(proto);

  for (i in parent) {
    child[i] = c(parent[i]);
  }

  return child;
}

document.body.onclick = () => {
  interacted = true;
}

exports.setup = setup;
exports.Rect = Rect;
exports.Ellipse = Ellipse;
exports.Sprite = Sprite;
exports.Text = Text;
exports.Sound = Sound;
exports.clear = clear;
