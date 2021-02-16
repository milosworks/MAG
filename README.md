# MAG (make-a-gif)

Make gifs easier

# Contents

- [Installation](#installation)
- [Overview](#overview)
- [Usage](#usage)
  - [Constructor](#constructor)
  - [Methods](#methods)
- [Examples](#expamples)
  - [Discord.js](#discord.js)

## Installation

```
npm install make-a-gif
```

## Overview

MAG is a module that makes it easy for you to create a gif using [gif-encoder-2](https://www.npmjs.com/package/gif-encoder-2) and [canvas](https://www.npmjs.com/package/canvas)

This module is made to work in a _Node_ environment such as [gif-encoder-2](https://www.npmjs.com/package/gif-encoder-2)

## Usage

### Constructor

`Gif(width, height)`

|   Parameter    |  Type   |          Description           | Required |  Default   |
| :------------: | :-----: | :----------------------------: | :------: | :--------: |
|    `width`     | number  | The width of images in pixels  |    no    |    500     |
|    `height`    | number  | The height of images in pixels |    no    |    500     |

```js
const gif = new Gif()
const gif = new Gif(200)
const gif = new Gif({height: 400})
const gif = new Gif(600, 700)
```

### Methods

|        Method        |    Parameter     |               Description               |    Default    |     Notes     |
| :------------------: | :--------------: | :-------------------------------------: | :-----------: |  :---------:  |
|      `setDelay `     |      number      | Set the delay between the colors/images |     1000      |               |
|    `setBackground`   |      string      | Set the color background between images |      n/a      |This is only applicated when the gif uses images not colors|
|      `setImages`     |   Array\<String>  |   The array of the images on the gif    |      n/a      |If you use this method you cant use the setColors method|
|      `setColors`     |   Array\<String>  |   The array of the images on the gif    |      n/a      |If you use this method you cant use the setImages method|
|       `create`       |       n/a        |Creates the gif en returns a buffer with the gif|      n/a      |It returns a Promise\<Buffer>|

## Examples

### Discord.js

```js
//Import the module
import Gif from 'make-a-gif'
//Create the pre gif with the options you want
const PreGif = new Gif()
//Set the colors that you want
    .setColors(`#FFFFFF`, `#000000`, `#FF0000`)
//If u want a different delay put in here
    .setDelay(1500)
//We create the gif
const gif = await PreGif.create()
//Create the attachment
const image = new Discord.MessageAttachment(gif, 'file.gif')
//Send it
message.channel.send(image)
```

<p align="center">
<img src="https://cdn.discordapp.com/attachments/803346384144433154/805488370926354464/file.gif" />
</p>

### Eris

```js
// Import the module
import Gif from 'make-a-gif'
//Create the pre gif with the options you want
const PreGif = new Gif()
//Set the colors that you want
    .setColors("#3F71C8", "#FF0000", "#00FF00")
//If u want a different delay put in here
    .setDelay(1550)
//We create the gif
const gif = await PreGif.create()
//and unlike in Discord.js we don't create an attachment here, we add it in the createMessage options
message.channel.createMessage('\u200b', { file: gif, name: 'file.gif' })
```

<p align="center">
<img src="https://cdn.discordapp.com/attachments/803024756865237016/805501067324162088/file.gif" />
</p>

