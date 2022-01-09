---
title: "API: Text"
layout: page
version: 0.11.2
---

# Text

**extends:** [Primitive](primitive)

### description
class for displaying text.

#### new Text(str, x, y, size?, col?, font?, align?)

**str** : `string`\
the text to show.

**x** : `number`\
x-coordinate of the text.

**y** : `number`\
y-coordinate of the text.

**size?** : `number` (default: `16`)\
size of the text.

**col?** : `string` (default: `#000`)\
color of the text.

**font?** : `string` (default: `Arial`)\
font family to use for the text.

**align?** : `string` (default: `left`)\
alignment to use for the text.\
valid values are those used for [`ctx.textAlign`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign).

#### properties
*str, size, col, font, align*\
as described above.
