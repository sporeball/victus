---
title: "Sprite"
layout: page
version: 0.12.0
category: "API reference"
nav_order: 4
---

# Sprite

**extends:** [Primitive](primitive)

### description
class for displaying images.

#### new Sprite(spr, x, y, w, h, obj?)

**spr** : `string`\
path to the image to use for the sprite.

**x** : `number`\
x-coordinate of the sprite.

**y** : `number`\
y-coordinate of the sprite.

**w** : `number`\
width of the sprite.

**h** : `number`\
height of the sprite.

**obj?** : `object`\
an object with which to call **set** ( ) on the sprite as it is created.

#### properties
*d*\
the [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) used to display the sprite.

*path*\
a [`Path2D`](https://developer.mozilla.org/en-US/docs/Web/API/Path2D) bounding the sprite.

#### getters &amp; setters
*set* **spr** (src: `string`)\
sets the sprite's source to `src`.
