---
title: "keys"
layout: page
version: 0.12.0
category: "API reference"
nav_order: 7
---

{:.no_toc}
# keys

### description
object containing data about the keyboard.

in this version, the `keys` object is simply a map between keyboard keys and the corresponding values returned by [`KeyboardEvent.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code). to detect a key press, an event listener must be used:

```js
document.addEventListener('keydown', e => {
  if (e.code == victus.keys.A) {
    console.log('the A key was pressed');
  }
});
```

#### properties
**A**, **B**, **C**, ..., **Z** : `string`\
mapped to the key codes `KeyA`, `KeyB`, `KeyC`, etc., respectively.

**Left**, **Up**, **Right**, **Down** : `string`\
mapped to the key codes `ArrowLeft`, `ArrowUp`, `ArrowRight`, and `ArrowDown`, respectively.
