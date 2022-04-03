//We need to import the module first, in your code it will be like import { Gif } from 'make-a-gif'
import { Gif } from '../build/index.js'

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
	const render = await myGif.decode()

	//Writes the gif in this folder
	await fs.writeFile(join(__dirname, 'make-a-gif.gif'), render)
=======
	const Image = new Gif(500, 500)
		//This is the delay between frames
		.setDelay(1500)
		.setRepeat(0)
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
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7
})()
