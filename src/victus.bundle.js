(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.victus = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
  victus.js
  copyright (c) 2019 sporeball
  MIT license
*/

var canvas = undefined;
var ctx = undefined;
var width = undefined;
var height = undefined;
var framerate = undefined;
var clearColor = undefined;

setup = obj => {
  canvas = document.getElementsByTagName("canvas")[0];
  ctx = canvas.getContext("2d");
  
  width = obj.width;
  height = obj.height;
  canvas.width = width;
  canvas.height = height;
  
  framerate = obj.framerate;
  clearColor = obj.clearColor;
}

loop = method => {
  window.setInterval(method, 1000 / framerate);
}

drawRect = (x, y, w, h, thickness, color) => {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  
  if (thickness % 2) { // returns 1 if odd
    x = x + 0.5;
    y = y + 0.5;
  }
  
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.stroke();
}

drawFilledRect = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

drawEllipse = (x, y, w, h, thickness, color) => {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  
  if (thickness % 2) { // returns 1 if odd
    x = x + 0.5;
    y = y + 0.5;
  }
  
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

drawFilledEllipse = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  
  ctx.beginPath();
  ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

drawSprite = (sprite, x, y) => {
  ctx.drawImage(sprite, x, y);
}

clear = () => {
  ctx.fillStyle = clearColor;
  ctx.fillRect(0, 0, width, height);
}

exports.setup = setup;
exports.loop = loop;
exports.drawRect = drawRect;
exports.drawFilledRect = drawFilledRect;
exports.drawEllipse = drawEllipse;
exports.drawFilledEllipse = drawFilledEllipse;
exports.drawSprite = drawSprite;
exports.clear = clear;
},{}]},{},[1])(1)
});
