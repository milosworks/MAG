//We need to import the module first, in your code it will be like import { Gif } from 'make-a-gif'
import { Gif } from '../build/index.js'

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
})()
