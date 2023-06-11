---
title: "Rect"
layout: page
version: 0.12.0
category: "API reference"
nav_order: 2
---

# Rect

**extends:** [Primitive](primitive)

### description
class for displaying simple squares or rectangles.

#### new Rect(x, y, w, h, col, obj?)

**x** : `number`\
x-coordinate of the rect.

**y** : `number`\
y-coordinate of the rect.

**w** : `number`\
width of the rect.

**h** : `number`\
height of the rect.

**col** : `string`\
the color of the rect (e.g. `"#ea323c"`).

**obj?** : `object`\
an object with which to call **setProps** ( ) on the rect as it is created.

#### properties
*col*\
as described above.

*path*\
a [`Path2D`](https://developer.mozilla.org/en-US/docs/Web/API/Path2D) defining the rect.
