//We need to import the module first, in your code it will be like import { Gif } from 'make-a-gif'
import { Gif } from '../build/index.js'

//This is for get the dirname
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

//Import fs to write the gif maked, this step is optional
import fs from 'fs/promises'

// To fetch the buffer of an image
import phin from 'phin'

//This is for get the dirname
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//An async function because to render the image we recieve a promise
;(async () => {
	// This is an example
	// Fetch the buffer of an image
	const res = await phin(
		'https://cdn.discordapp.com/attachments/724014357343895703/960220310144184330/unknown.png'
	)

	//We instance the class Gif and give the proportions of width 500 and height 500
	const myGif = new Gif(500, 500)
	//We set 3 images that will be 3 frames
	await myGif.setFrames([
		{
			src: 'https://cdn.discordapp.com/attachments/960206787775201314/960213088974561280/unknown.png'
		},
		{
			src: new Uint8Array(Buffer.from(res.body))
		},
		{
			src: 'https://cdn.discordapp.com/attachments/960206787775201314/960213089536585808/unknown.png',
			background:
				'https://cdn.discordapp.com/attachments/724014357343895703/960220070976565378/unknown.png'
		}
	])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const render = await myGif.encode()

	//Writes the gif in this folder
	await fs.writeFile(join(__dirname, 'make-a-gif.gif'), render)
})()
