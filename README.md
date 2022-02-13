# MAG (make-a-gif)

Make gifs easier

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

MAG is a module that makes it easy for you to create a gif using [gifencoder](https://www.npmjs.com/package/gifencoder) and [canvas](https://www.npmjs.com/package/canvas)

This module is made to work in a _Node_ environment such as [gifencoder](https://www.npmjs.com/package/gifencoder)

## Usage

### Constructor

`Gif(width, height)`

| Parameter |  Type  |          Description           | Required | Default |
| :-------: | :----: | :----------------------------: | :------: | :-----: |
|  `width`  | number | The width of images in pixels  |    no    |   500   |
| `height`  | number | The height of images in pixels |    no    |   500   |

```js
const gif = new Gif()
const gif = new Gif(200)
const gif = new Gif(600, 700)
```

### Methods

|     Method      | Parameter |                     Description                      | Default |
| :-------------: | :-------: | :--------------------------------------------------: | :-----: |
|   `setDelay`    |  number   |           Set the delay between the frames           |   500   |
|  `setQuality`   |  number   |          Set the quality of the gif, max 10          |   10    |
|   `setFrames`   |   Image   |              Set the frames of the gif               |   []    |
|   `setRepeat`   |  boolean  |             Set if the gif should repeat             |  true   |
| `setSkipOnFail` |  boolean  | Set if a frame should be skipped if it gave an error |  true   |
|    `render`     |    n/a    |     Renderizes the gif, returns a promise buffer     |   n/a   |

### Interfaces

| Interface |               Types               |                                  Description                                  |
| :-------: | :-------------------------------: | :---------------------------------------------------------------------------: |
|  `Frame`  | \{src: Image, background?: Image} | The src is the main image and the background the image at the back at the src |
|  `Image`  |         string \| Buffer          |                             A buffer or a string                              |

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

//This is for get the dirname
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//An async function because to render the image we recieve a promise
;(async () => {
	//We instance the class Gif and give the proportions of width 500 and height 500
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

	//Writes the gif in this folder
	await fs.writeFile(join(__dirname, 'make-a-gif.gif'), Render)
})()
```

### Discord.js

```js
//We need to import the module first
import { Gif } from 'make-a-gif'

//An async function because to render the image we recieve a promise
;(async () => {
	//We instance the class Gif and give the proportions of width 500 and height 500
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
})()
```

<p align="center">
<img src="https://vyrekxd.is-inside.me/mAFsuW8O.gif" />
</p>
