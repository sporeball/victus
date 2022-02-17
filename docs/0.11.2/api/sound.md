---
title: "Sound"
layout: page
version: 0.11.2
category: "API reference"
nav_order: 6
---

# Sound

### description
class for playing sounds.

#### new Sound(snd, vol, loop?)

**snd** : `string`\
path to the audio file to use for this sound.

**vol** : `number`\
the volume at which to play the sound.

**loop?** : `boolean`\
whether the sound should loop upon finishing.

#### properties
*vol*\
as described above.

*d*\
the [`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) used to play the sound.

#### methods
**play** ( )\
plays the sound.

**pause** ( )\
pauses the sound.

**reset** ( )\
resets the sound by calling [`HTMLMediaElement.load()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/load).
