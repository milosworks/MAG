# MAG (make-a-gif)

A pure typescript module to make easier a gif

# Contents

-   [Installation](#installation)
-   [Overview](#overview)
-   [Usage](#usage)
    -   [Constructor](#constructor)
    -   [Methods](#methods)
    -   [Interfaces](#interfaces)
-   [Examples](#expamples)
    -   [General](#main)
    -   [Discord.js](#discord.js)

## Installation

```
npm install make-a-gif
```

## Overview

No extra dependencies, this module doesnt uses canvas, it uses [imagescript](https://www.npmjs.com/package/imagescript)

## Usage

### Constructor

`Gif(width, height)`

| Parameter |  Type  |                  Description                  | Required | Default |
| :-------: | :----: | :-------------------------------------------: | :------: | :-----: |
|  `width`  | number |         The width of images in pixels         |    no    |   500   |
| `height`  | number |        The height of images in pixels         |    no    |   500   |
| `quality` | number | The quality of the gif ((best) 1..30 (worst)) |    no    |    1    |

```js
const gif = new Gif()
const gif = new Gif(200)
const gif = new Gif(600, 700)
const gif = new Gif(600, 700, 1)
```

### Methods

<<<<<<< HEAD
|   Method    |   Parameter   |                         Description                         | Default |
| :---------: | :-----------: | :---------------------------------------------------------: | :-----: |
| `setLoops`  |    number     | The number of loops the gif will play, -1 is infinite loops |   -1    |
| `setFrames` | Frame/Frame[] |                    Set frames to the gif                    |   n/a   |
| `addFrame`  |     Frame     |                   Add a frame to the gif                    |   n/a   |
|  `decode`   |      n/a      |      Renderizes the gif, returns a promise Uint8Array       |   n/a   |
=======
|     Method      | Parameter |                     Description                      | Default |
| :-------------: | :-------: | :--------------------------------------------------: | :-----: |
|   `setDelay`    |  number   |           Set the delay between the frames           |   500   |
|  `setQuality`   |  number   |          Set the quality of the gif, max 10          |   10    |
|   `setFrames`   |   Image   |              Set the frames of the gif               |   []    |
|   `setRepeat`   |  boolean  |             Set if the gif should repeat             |  true   |
| `setSkipOnFail` |  boolean  | Set if a frame should be skipped if it gave an error |  true   |
|    `render`     |    n/a    |     Renderizes the gif, returns a promise buffer     |   n/a   |
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7

### Interfaces

|     Interface     |                                  Types                                   |                                                                   Description                                                                   |
| :---------------: | :----------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |
|      `Frame`      | \{src: SupportedImages, background?: SupportedImages, duration?: number} | The src is the main image and the background the image at the back at the src and the duration of the frame in the gif, default 500 miliseconds |
| `SupportedImages` |                           string \| Uint8Array                           |                                                              A buffer or a string                                                               |

## Examples

### Main

```js
//We need to import the module first
import { Gif } from 'make-a-gif'

//This is for get the dirname
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

//Import fs to write the gif maked, this step is optional
import fs from 'fs/promises'
<<<<<<< HEAD

// To fetch the buffer of an image
import fetch from 'node-fetch'
=======
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7

//This is for get the dirname
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//An async function because to render the image we recieve a promise
;(async () => {
	// This is an example
	// Fetch the buffer of an image
	const res = await fetch(
		'https://cdn.discordapp.com/attachments/724014357343895703/960220310144184330/unknown.png'
	)

	//We instance the class Gif and give the proportions of width 500 and height 500
<<<<<<< HEAD
	const myGif = new Gif(500, 500)
	//We set 3 images that will be 3 frames
	await myGif.setFrames([
		{
			src: 'https://cdn.discordapp.com/attachments/960206787775201314/960213088974561280/unknown.png'
		},
		{
			src: new Uint8Array(await res.arrayBuffer())
		},
		{
			src: 'https://cdn.discordapp.com/attachments/960206787775201314/960213089536585808/unknown.png',
			background:
				'https://cdn.discordapp.com/attachments/724014357343895703/960220070976565378/unknown.png'
		}
	])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const Render = await myGif.decode()
=======
	const Image = new Gif(500, 500)
		//This is the delay between frames
		.setDelay(1500)
		//We set 3 images that will be 3 frames
		.setFrames([
			'https://i.imgur.com/QnaDhkD.png',
			'https://i.imgur.com/8bazwQp.png',
			'https://i.imgur.com/wPMwvr5.png'
		])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const Render = await Image.render().catch((e) => console.error(e))
	if (!Render) return
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7

	//Writes the gif in this folder
	await fs.writeFile(join(__dirname, 'make-a-gif.gif'), Render)
})()
```

### Discord.js

```js
//We need to import the module first, in your code it will be like import { Gif } from 'make-a-gif'
import { Gif } from '../build/index.js'

// To fetch the buffer of an image
import fetch from 'node-fetch'

//An async function because to render the image we recieve a promise
;(async () => {
	// This is an example
	// Fetch the buffer of an image
	const res = await fetch(
		'https://cdn.discordapp.com/attachments/724014357343895703/960220310144184330/unknown.png'
	)

	//We instance the class Gif and give the proportions of width 500 and height 500
<<<<<<< HEAD
	const myGif = new Gif(500, 500)
	//We set 3 images that will be 3 frames
	await myGif.setFrames([
		{
			src: 'https://cdn.discordapp.com/attachments/960206787775201314/960213088974561280/unknown.png'
		},
		{
			src: new Uint8Array(await res.arrayBuffer())
		},
		{
			src: 'https://cdn.discordapp.com/attachments/960206787775201314/960213089536585808/unknown.png',
			background:
				'https://cdn.discordapp.com/attachments/724014357343895703/960220070976565378/unknown.png'
		}
	])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const render = await myGif.decode()
	const attachment = new Discord.MessageAttachment(Buffer.from(render.buffer))

	message.channel.send({ attachments: [attachment] })
=======
	const Image = new Gif(500, 500)
		//This is the delay between frames
		.setDelay(1500)
		//We set 3 images that will be 3 frames
		.setFrames([
			'https://i.imgur.com/QnaDhkD.png',
			'https://i.imgur.com/8bazwQp.png',
			'https://i.imgur.com/wPMwvr5.png'
		])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const Render = await Image.render().catch((e) => console.error(e))
	if (!Render) return

	//Create the attachment
	const image = new Discord.MessageAttachment(Render, 'file.gif')
	//Send it
	message.channel.send({ attachments: [image] })
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7
})()
```

<p align="center">
<img src="https://vyrekxd.is-inside.me/mAFsuW8O.gif" />
</p>
