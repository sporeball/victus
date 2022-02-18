---
title: "mouse"
layout: page
version: 0.11.2
category: "API reference"
nav_order: 8
---

{:.no_toc}
# mouse

### description
object containing data about the mouse.

#### properties

**x** : `number`\
the value returned by [`MouseEvent.pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX).

**y** : `number`\
the value returned by [`MouseEvent.pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY).

**click** : `boolean`\
returns `true` for exactly one frame if a left click is detected.

**held** : `boolean`\
returns `true` as long as the left mouse button is held down.
