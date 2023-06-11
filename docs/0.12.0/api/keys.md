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

each of the object's keys is a key returned by [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key). each value is an object with the following properties:

- **press** : `boolean`\
changes to `true` when a keypress is detected.

{: .note}
the `press` property of each key **does not reset on its own**. they should be manually set to `false` at the end of your game loop; each keypress detected will then cause them to return `true` for exactly one frame.

- **held** : `boolean`\
returns `true` as long as the corresponding key is held down.
