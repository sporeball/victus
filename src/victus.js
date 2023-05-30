/*
  victus.js
  copyright (c) 2023 sporeball & contributors:
    - evaporei
  MIT license
*/

(() => {
  let canvas, ctx, w, h; // Populated during setup.
  let keys, mouse; // Input objects; updated constantly.
  let t; // Any function which uses the `this` keyword at least 3 times will alias it to `t` instead.
  let o; // Object for Primitive.clone().
  let Z; // Iteration variable for the canvas context hash trick.

  // Additional aliases.
  let p = Math.PI;
  let O = Object;
  let P = Path2D;

  /**
   * Primitive class. Most other primitives are derived from this class.
   *
   * @param {number} x X-coordinate of the primitive.
   * @param {number} y Y-coordinate of the primitive.
   * @param {number} w Width of the primitive.
   * @param {number} h Height of the primitive.
   * @param {object} [obj] An object with which to call `set()` on the primitive during construction.
   */
  class Primitive {
    constructor(x, y, w, h, obj) {
      t = this;
      t.x = x;
      t.y = y;
      t.w = w;
      t.h = h;
      t.xv = t.yv = t.rotation = 0;
      t.ax = x + (w / 2);
      t.ay = y + (h / 2);
      t.hidden = false;
      t.set(obj);
    }

    moveTo(x, y) {
      this.x = x;
      this.y = y;
    }

    moveBy(x, y) {
      this.x += x;
      this.y += y;
    }

    anchor(x, y) {
      this.ax = x;
      this.ay = y;
    }

    hide() {
      this.hidden = true;
    }

    show() {
      this.hidden = false;
    }

    set(obj) {
      O.assign(this, obj);
    }

    clone(obj) {
      o = O.assign(O.create(this), this);
      o.set(obj);
      return o;
    }

    draw() {
      // Alias this.
      t = this;

      // Move the object according to its velocity.
      // This is run every frame, so the values have to be divided.
      t.moveBy(t.xv / 60, t.yv / 60);

      // Transform the canvas.
      ctx.save();
      ctx.translate(t.ax, t.ay);
      ctx.rotate(t.rotation * p / 180);
      ctx.translate(-t.ax, -t.ay);

      // Draw the object.
      if (!t.hidden) t._();

      // Undo the transformation.
      ctx.restore();
    }
  }

  /**
   * Rect class.
   *
   * @param {number} x X-coordinate of the rect.
   * @param {number} y Y-coordinate of the rect.
   * @param {number} w Width of the rect.
   * @param {number} h Height of the rect.
   * @param {string} col The color of the rect.
   * @param {object} [obj] An object with which to call `set()` on the rect during construction.
   */
  class Rect extends Primitive {
    constructor(x, y, w, h, col, obj) {
      super(x, y, w, h, obj);
      this.col = col;
      (this.path = new P()).rect(x, y, w, h);
    }

    _() {
      ctx.fillStyle = t.col;
      ctx.fill(t.path);
    }
  }

  /**
   * Ellipse class.
   *
   * @param {number} x X-coordinate of the ellipse.
   * @param {number} y Y-coordinate of the ellipse.
   * @param {number} w Width of the ellipse.
   * @param {number} h Height of the ellipse.
   * @param {string} col The color of the ellipse.
   * @param {object} [obj] An object with which to call `set()` on the ellipse during construction.
   */
  class Ellipse extends Rect {
    constructor(x, y, w, h, col, obj) {
      super(x, y, w, h, obj);
      this.col = col;
      (this.path = new P()).ellipse(x, y, w / 2, h / 2, 0, 0, 7);
    }

    _() {
      ctx.fillStyle = t.col;
      ctx.fill(t.path);
    }
  }

  /**
   * Sprite class.
   *
   * @param {string} spr Path to the image to use for the sprite.
   * @param {number} x X-coordinate of the sprite.
   * @param {number} y Y-coordinate of the sprite.
   * @param {number} w Width of the sprite.
   * @param {number} h Height of the sprite.
   * @param {object} [obj] An object with which to call `set()` on the sprite during construction.
   */
  class Sprite extends Primitive {
    constructor(spr, x, y, w, h, obj) {
      super(x, y, w, h, obj);
      (this.d = new Image).src = spr;
      (this.path = new P()).rect(x, y, w, h);
    }

    _() {
      ctx.drawImage(t.d, t.x, t.y, t.w, t.h);
    }
  }

  /**
   * Text class.
   *
   * @param {string} str The string to draw.
   * @param {number} x X-coordinate of the object.
   * @param {number} y Y-coordinate of the object.
   * @param {number} [size] The size of the text, in px.
   * @param {string} [col] Text color.
   * @param {string} [font] The font to use when drawing.
   * @param {string} [align] The text alignment to use when drawing.
   */
  class Text extends Primitive {
    constructor(str, x, y, size = 16, col = "#000", font = "Arial", align = "left") {
      super(x, y);
      t = this;
      t.str = str;
      t.size = size;
      t.col = col;
      t.font = font;
      t.align = align;
    }

    _() {
      ctx.fillStyle = t.col;
      ctx.font = t.size + "px " + t.font;
      ctx.textAlign = t.align;
      ctx.fillText(t.str, t.x, t.y);
    }
  }

  /**
   * Sound class.
   *
   * @param {string} snd Path to the audio file.
   * @param {number} [vol] The volume to play the sound at.
   * @param {boolean} [loop] Whether to loop the sound.
   */
  class Sound {
    constructor(snd, vol=1, loop=0) {
      t = this;
      t.vol = vol;

      // audio data
      (t.d = new Audio(snd)).loop = loop;
    }

    reset() {
      this.d.currentTime = 0;
    }

    play() {
      t = this;
      t.d.volume = t.vol;
      t.d.play();
    }

    pause() {
      this.d.pause();
    }
  }

  // keyboard object
  keys = {};
  onkeydown = e => {
    keys[e.key] = keys[e.key] ?? {};
    if (!keys[e.key].held) {
      keys[e.key].press = true;
    }
    keys[e.key].held = true;
  }
  onkeyup = e => {
    keys[e.key].held = false;
  }
  // onkeydown = onkeyup = e => {
  //   keys[e.key] = e.type[5];
  // };

  // mouse object
  mouse = {};
  onmousemove = e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  }
  onmousedown = e => {
    if (e.button == 0) {
      if (!mouse.held) {
        mouse.click = true;
      }
      mouse.held = true;
    }
  }
  onmouseup = e => {
    if (e.button == 0) {
      mouse.held = false;
    }
  }

  victus = {
    setup: obj => {
      canvas = this[obj.id];
      canvas.style.background = obj.color || "#fff";
      ctx = canvas.getContext("2d");
      victus.ctx = ctx;

      // canvas context hash trick
      // modified from the tried and true; only 2 hash collisions!
      for(Z in ctx)ctx[Z[0]+Z[Z.length-2]+Z.length%9]=ctx[Z];

      w = canvas.width = obj.w;
      h = canvas.height = obj.h;
    },
    Rect,
    Ellipse,
    Sprite,
    Text,
    Sound,
    keys,
    mouse,
    // setting a dimension clears the canvas
    clear: () => { canvas.width = w }
  };
})()
