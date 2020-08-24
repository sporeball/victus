/*
  victus.js
  copyright (c) 2020 sporeball
  MIT license
*/

!function() {
  var canvas, ctx, w, h, color, l;
  var p = Math.PI;

  /**
   * Primitive class. Most other primitives are derived from this class.
   *
   * @param x - X-coordinate of the primitive.
   * @param y - Y-coordinate of the primitive.
   * @param w - Width of the primitive.
   * @param h - Height of the primitive.
   */
  class Primitive {
    constructor(x, y, w, h, obj) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.xv = this.yv = this.rotation = 0;
      this.anchorX = this.w / 2;
      this.anchorY = this.h / 2;
      this.hidden = false;
      this.setProps(obj);
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
      this.anchorX = x;
      this.anchorY = y;
    }

    hide() {
      this.hidden = true;
    }

    show() {
      this.hidden = false;
    }

    setProps(obj) {
      Object.assign(this, obj);
    }

    clone(obj) {
      let o = c(this);
      o.setProps(obj);
      return o;
    }

    draw() {
      // Move the object according to its velocity.
      this.moveBy(this.xv, this.yv);
      // Update its internal anchor point.
      this.ax = this.x + this.anchorX;
      this.ay = this.y + this.anchorY;

      // Transform the canvas.
      ctx.save();
      ctx.translate(this.ax, this.ay);
      ctx.rotate(this.rotation * (p / 180));
      ctx.translate(-this.ax, -this.ay);

      // Draw the object.
      if (!this.hidden) this._();

      // Undo the transformation.
      ctx.restore();
    }
  }

  /**
   * Rect class.
   *
   * @param x - X-coordinate of the rect.
   * @param y - Y-coordinate of the rect.
   * @param w - Width of the rect.
   * @param h - Height of the rect.
   * @param col - The color to use when drawing.
   */
  class Rect extends Primitive {
    constructor(x, y, w, h, col, obj) {
      super(x, y, w, h, obj);
      this.col = col;
    }

    _() {
      k(this.x, this.y, this.w, this.h, this.col);
    }
  }

  /**
   * Ellipse class.
   *
   * @param x - X-coordinate of the ellipse.
   * @param y - Y-coordinate of the ellipse.
   * @param w - Width of the ellipse.
   * @param h - Height of the ellipse.
   * @param col - The color to use when drawing.
   */
  class Ellipse extends Primitive {
    constructor(x, y, w, h, col, obj) {
      super(x, y, w, h, obj);
      this.col = col;
    }

    _() {
      ctx.fillStyle = this.col;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, 2 * p);
      ctx.closePath();
      ctx.fill();
    }
  }

  /**
   * Sprite class.
   *
   * @param spr - Path to the sprite.
   * @param x - X-coordinate of the sprite.
   * @param y - Y-coordinate of the sprite.
   */
  class Sprite extends Primitive {
    constructor(spr, x, y, w, h, obj) {
      super(x, y, w, h, obj);
      this.spr = spr;

      this.d = new Image;
      this.d.src = this.spr;
    }

    _() {
      ctx.drawImage(this.d, this.x, this.y, this.w, this.h);
    }
  }

  /**
   * Text class.
   *
   * @param str - The string to draw.
   * @param x - X-coordinate of the object.
   * @param y - Y-coordinate of the object.
   * @param size - The size of the text, in px.
   * @param col - Text color.
   * @param font - The font to use when drawing.
   * @param align - The text alignment to use when drawing.
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
   * @param snd - Path to the audio file.
   * @param vol - The volume to play the sound at.
   * @param loop - Whether to loop the sound.
   */
  class Sound {
    constructor(snd, vol, loop=0) {
      this.snd = snd;
      this.vol = vol;

      // audio data
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
  l = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  [...l].map(c => keys[c] = "Key" + c);

  // mouse object
  var mouse = {
    x: 0,
    y: 0,
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

  k = (x=0, y=0, a=w, b=h, c=color) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, a, b);
  }

  // expose ctx
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
    clear: k,
    keys: keys,
    mouse: mouse
  };
}();
