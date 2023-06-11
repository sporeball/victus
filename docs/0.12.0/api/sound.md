---
title: "Sound"
layout: page
version: 0.12.0
category: "API reference"
nav_order: 6
---

# Sound

### description
class for playing sounds.

#### new Sound(snd, vol?, loop?)

**snd** : `string`\
path to the audio file to use for the sound.

**vol?** : `number` (default: `1`)\
the volume at which to play the sound.

**loop?** : `boolean` (default: `false`)\
whether the sound should loop upon finishing.

#### properties
*vol*, *loop*\
as described above.

*d*\
the [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) used to play the sound.

#### methods
**play** ( )\
plays the sound.

**pause** ( )\
pauses the sound.

**reset** ( )\
resets the sound by setting `d.currentTime` to `0`.

#### getters &amp; setters
*set* **vol** (v: `number`)\
sets the volume of the sound to `v`.

*set* **loop** (l: `boolean`)\
sets the sound's `loop` property to `l`.
