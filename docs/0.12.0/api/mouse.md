---
title: "mouse"
layout: page
version: 0.12.0
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
changes to `true` when a left click is detected.

{: .note}
the `click` property **does not reset on its own**. it should be manually set to `false` at the end of your game loop; each click detected will then cause it to return `true` for exactly one frame.

**held** : `boolean`\
returns `true` as long as the left mouse button is held down.
