---
title: "API: Sprite"
layout: page
version: 0.11.2
---

# Sprite

**extends:** [Primitive](primitive)

### description
class for displaying images.

#### new Sprite(spr, x, y, w, h, obj?)

**spr** : `string`\
path to the image to use for this sprite.

**x** : `number`\
x-coordinate of the sprite.

**y** : `number`\
y-coordinate of the sprite.

**w** : `number`\
width of the sprite.

**h** : `number`\
height of the sprite.

**obj?** : `object`\
an object with which to call **setProps** ( ) on the sprite as it is created.

#### properties
*d*\
the [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) used to display the sprite.
