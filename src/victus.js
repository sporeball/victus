/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

!function() {
  var canvas, ctx, w, h, color, l, z;

  // private primitive class
  // most other primitives are derived from this
  class Primitive {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.xv = this.yv = 0;
      this.o();
    }
    
    o(ox, oy) {
      this.ox = ox || this.w / 2;
      this.oy = oy || this.h / 2;
    }
    
    moveTo(x, y) {
      this.x = x;
      this.y = y;
    }
    
    moveBy(x, y) {
      this.x += x;
      this.y += y;
    }
    
    hide() {
      if (this.a) {
        this.a = color;
      } else {
        this.s = false;
      }
    }
    
    show() {
      if (this.a) {
        this.a = this.col;
      } else {
        this.s = true;
      }
    }
    
    clone() {
      return c(this);
    }
    
    // private update function
    u() {
      this.moveBy(this.xv, this.yv);
    }
  }

  class Rect extends Primitive {
    constructor(x, y, w, h, col) {
      super(x, y, w, h);
      this.col = this.a = col;
    }
    
    draw() {
      this.u();
      cl(this.x, this.y, this.w, this.h, this.a);
    }
  }

  class Ellipse extends Primitive {
    constructor(x, y, w, h, col) {
      super(x, y, w, h);
      this.col = this.a = col;
    }
    
    draw() {
      this.u();
      ctx.fillStyle = this.a;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
  }

  class Sprite extends Primitive {
    constructor(spr, x, y) {
      super(x, y);
      this.spr = spr;
      this.r = 0;
      this.s = true;
      
      // image data
      this.d = new Image;
      this.d.src = this.spr;
      wt(this.d).then(() => {
        this.w = this.d.width;
        this.h = this.d.height;
        this.o();
      });
    }
    
    draw() {
      this.u();
      if (this.s) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.r * Math.PI) / 180);
        ctx.drawImage(this.d, 0, 0, this.d.width, this.d.height, -this.ox, -this.oy, this.d.width, this.d.height);
        ctx.restore();
      } else {
        cl(this.x, this.y, this.w, this.h);
      }
    }
  }

  class Text extends Primitive {
    constructor(str, x, y, size = 16, col = "#000", font = "Arial", align = "left") {
      super(x, y);
      this.str = str;
      this.size = size;
      this.col = this.a = col;
      this.font = font;
      this.align = align;
    }
    
    draw() {
      ctx.fillStyle = this.a;
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
      this.reset();
      this.d.volume = this.vol;
      this.d.play();
    }

    pause() {
      this.d.pause();
    }
  }

  // keyboard object
  var keys = {
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown"
  }
  
  // loop over each letter of the alphabet to quickly add the rest of the keys
  z = 0;
  do {
    l = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(z, z + 1);
    keys[l] = "Key" + l;
    z++;
  }
  while (z < 26);
  
  var mouse = {
    x: undefined,
    y: undefined,
    click: 0,
    held: 0
  };
  document.onmousemove = e => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  }
  document.onmousedown = e => {
    if (e.which == 1) {
      if (!mouse.held) {
        mouse.click = true;
      }
      mouse.held = true;
    }
  }
  document.onmouseup = e => {
    if (e.which == 1) {
      mouse.held = false;
    }
  }

  // clone function
  // adapted from the clone package, by pvorb
  c = parent => {
    let child;
    
    if (typeof parent != 'object') {
      return parent;
    }
    
    child = Object.create(Object.getPrototypeOf(parent));

    for (i in parent) {
      child[i] = c(parent[i]);
    }

    return child;
  }
  
  // clear function
  // some primitives make use of this to save some bytes
  // if called from another script without any parameters, this function clears the entire canvas
  cl = (x=0, y=0, wd=w, hg=h, c=color) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, wd, hg);
  }

  // wait helper
  // returns a promise that resolves when its image object has loaded
  // this is necessary when initializing the origin of a sprite
  wt = (el) => {
    return new Promise(resolve => {
      el.onload = resolve;
    });
  }
  x = () => { return ctx; }

  window.victus = {
    setup: obj => {
      canvas = document.getElementById(obj.id);
      ctx = canvas.getContext("2d");
      
      w = canvas.width = obj.w;
      h = canvas.height = obj.h;

      color = obj.color || "#fff";
    },
    Rect: Rect,
    Ellipse: Ellipse,
    Sprite: Sprite,
    Text: Text,
    Sound: Sound,
    clear: cl,
    keys: keys,
    mouse: mouse
  };
}();
