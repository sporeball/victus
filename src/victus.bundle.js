(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.victus = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

/**
 * @param `parent` - the object to be cloned
*/
function clone(parent) {
  function _clone(parent) {
    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }
    
    if (clone._isArray(parent)) {
      child = [];
    } else if (clone._isRegExp(parent)) {
      child = new RegExp(parent.source, _getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }
      child[i] = _clone(parent[i], Infinity);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], Infinity);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    return child;
  }

  return _clone(parent, Infinity);
}

// private utility functions

function _objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone._objToStr = _objToStr;

function _isArray(o) {
  return typeof o === 'object' && _objToStr(o) === '[object Array]';
}
clone._isArray = _isArray;

function _isRegExp(o) {
  return typeof o === 'object' && _objToStr(o) === '[object RegExp]';
}
clone._isRegExp = _isRegExp;

function _getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone._getRegExpFlags = _getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

},{}],2:[function(require,module,exports){
/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

const cl = require("clone");

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
    return cl(this);
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
},{"clone":1}]},{},[2])(2)
});
