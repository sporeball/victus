---
title: "victus"
layout: page
version: 0.12.0
category: "API reference"
nav_order: 0
---

{:.no_toc}
# victus

### description
this page documents methods and properties which are not described on their own pages.

#### properties
*ctx*\
the canvas context.

#### methods
**setup** (obj : `object`)\
initializes the canvas that victus will use.\
`obj` takes the following keys:

- **id** : `string` - the ID of the canvas.
- **w** : `number` - the width to apply to the canvas.
- **h** : `number` - the height to apply to the canvas.
- **color?** : `string` (default: `"#fff"`) - the background color to use.

this should typically be used with the [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) event:

```js
document.addEventListener('DOMContentLoaded', victus.setup({
  id: 'canvas',
  w: 300,
  h: 300
}));
```

**clear** ( )\
clears the canvas.
