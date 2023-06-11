---
title: "Primitive"
layout: page
version: 0.12.0
category: "API reference"
nav_order: 1
---

{:.no_toc}
# Primitive

**extended by:** [Rect](rect), [Ellipse](ellipse), [Sprite](sprite), [Text](text)

### description
base class. most of the objects you'll create are derived from this class.

#### new Primitive(x, y, w, h, obj?)

**x** : `number`\
x-coordinate of the primitive.

**y** : `number`\
y-coordinate of the primitive.

**w** : `number`\
width of the primitive.

**h** : `number`\
height of the primitive.

**obj?** : `object`\
an object with which to call **set** ( ) on the primitive as it is created.

#### properties
*x, y, w, h*\
as described above.

**xv** : `number`\
x velocity of the primitive, in **pixels per second**.

**yv** : `number`\
y velocity of the primitive, in **pixels per second**.

**r** : `number`\
rotation of the primitive around its anchor point, in degrees.

**rv**: `number`\
rotational velocity of the primitive, in **degrees per second**.

**ax** : `number`\
x-coordinate of the primitive's anchor point. `0` represents the top left corner of the canvas.\
defaults to that of the primitive's center.

**ay** : `number`\
y-coordinate of the primitive's anchor point. `0` represents the top left corner of the canvas.\
defaults to that of the primitive's center.

**hidden** : `boolean`\
whether or not the primitive is hidden (will not be drawn).

#### methods
**&#95;** ( )\
this method is the one that actually draws the primitive to the canvas.\
as **draw** ( ) is called, if `hidden` is set to `false`, this method will be called as well.

**&#95;p** ( )\
updates the primitive's `path` property, if it has one.\
this is called automatically when the primitive moves.

**moveTo** (x : `number`, y : `number`)\
moves the primitive to the coordinates `(x, y)`.

**moveBy** (x : `number`, y : `number`)\
adds `(x, y)` to the coordinates of the primitive.

**rotateTo** (a : `number`)\
sets the primitive's rotation to `a` degrees.

**rotateBy** (a : `number`)\
adds `a` degrees to the rotation of the primitive.

**anchor** (x : `number`, y : `number`)\
sets the primitive's anchor point to `(x, y)`.

**hide** ( )\
hides the primitive.

**show** ( )\
shows the primitive.

**set** (obj : `object`)\
copies all properties found on `obj` to the primitive.

**clone** (obj? : `object`)\
returns a new primitive with identical properties to the original.\
if `obj` is given, **set** ( ) will be called on the clone.

**draw** ( )\
updates the primitive's position and rotation, applies the primitive's rotation, then calls **&#95;** ( ) to draw it to the canvas.
