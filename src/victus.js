/*
  victus.js
  copyright (c) 2023 sporeball & contributors:
    - evaporei
  MIT license
*/

(() => {
  let canvas, ctx, w; // Populated during setup.
  let o; // Object for Primitive.clone().
  let Z; // Iteration variable for the canvas context hash trick.

  // Input objects; updated constantly.
  let keys = {};
  let mouse = {};

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
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.xv = this.yv = this.r = 0;
      this.ax = x + (w / 2);
      this.ay = y + (h / 2);
      this.hidden = false;
      this.set(obj);
      this._p();
    }

    moveTo(x, y) {
      // Update anchor first...
      this.ax += x - this.x;
      this.ay += y - this.y;
      // ...then position.
      this.x = x;
      this.y = y;
      this._p();
    }

    moveBy(x, y) {
      // Update anchor first...
      this.ax += x;
      this.ay += y;
      // ...then position.
      this.x += x;
      this.y += y;
      this._p();
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
      Object.assign(this, obj);
    }

    clone(obj) {
      (o = Object.assign(Object.create(this), this)).set(obj);
      return o;
    }

    draw() {
      // Move the object according to its velocity.
      // This is run every frame, so the values have to be divided.
      this.moveBy(this.xv / 60, this.yv / 60);

      // Transform the canvas.
      ctx.save();
      ctx.translate(this.ax, this.ay);
      ctx.rotate(this.r * Math.PI / 180);
      ctx.translate(-this.ax, -this.ay);

      // Draw the object.
      if (!this.hidden) this._();

      // Undo the transformation.
      ctx.restore();
    }

    _p() {}
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
    }

    _() {
      ctx.fillStyle = this.col;
      ctx.fill(this.path);
    }

    _p() {
      (this.path = new Path2D()).rect(this.x, this.y, this.w, this.h);
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
  class Ellipse extends Primitive {
    constructor(x, y, w, h, col, obj) {
      super(x, y, w, h, obj);
      this.col = col;
    }

    _() {
      ctx.fillStyle = this.col;
      ctx.fill(this.path);
    }

    _p() {
      (this.path = new Path2D()).ellipse(this.x, this.y, this.w / 2, this.h / 2, 0, 0, 7);
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
    }

    _() {
      ctx.drawImage(this.d, this.x, this.y, this.w, this.h);
    }

    _p() {
      (this.path = new Path2D()).rect(this.x, this.y, this.w, this.h);
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
      this.str = str;
      this.size = size;
      this.col = col;
      this.font = font;
      this.align = align;
    }

    _() {
      ctx.fillStyle = this.col;
      ctx.font = this.size + "px " + this.font;
      ctx.textAlign = this.align;
      ctx.fillText(this.str, this.x, this.y);
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
      this.vol = vol;
      // audio data
      (this.d = new Audio(snd)).loop = loop;
    }

    reset() {
      this.d.currentTime = 0;
    }

    play() {
      this.d.volume = this.vol;
      this.d.play();
    }

    pause() {
      this.d.pause();
    }
  }

  // keyboard object
  onkeydown = e => {
    keys[e.key] = keys[e.key] ?? {};
    if (!keys[e.key].held) {
      keys[e.key].press = true;
    }
    keys[e.key].held = true;
  }
  onkeyup = e => {
    keys[e.key] = keys[e.key] ?? {};
    keys[e.key].held = false;
  }
  // onkeydown = onkeyup = e => {
  //   keys[e.key] = e.type[5];
  // };

  // mouse object
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
      (canvas = this[obj.id]).style.background = obj.color || "#fff";
      victus.ctx = ctx = canvas.getContext("2d");

      // canvas context hash trick
      // modified from the tried and true; only 2 hash collisions!
      for(Z in ctx)ctx[Z[0]+Z[Z.length-2]+Z.length%9]=ctx[Z];

      w = canvas.width = obj.w;
      canvas.height = obj.h;
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
