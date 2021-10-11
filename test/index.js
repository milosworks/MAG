//We need to import the module first, in your code it will be like import { Gif } from 'make-a-gif'
import { Gif } from '../build/index.js'

//This is for get the dirname
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

//Import fs to write the gif maked, this step is optional
import fs from 'fs'

//This is for get the dirname
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
			'https://vyrekxd.is-inside.me/GFlSMu1U.png',
			'https://vyrekxd.is-inside.me/CCtuX9pK.png',
			'https://vyrekxd.is-inside.me/Y6WwerwW.png'
		])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const Render = await Image.render()

	//Writes the gif in this folder
	fs.writeFileSync(join(__dirname, 'make-a-gif.gif'), Render)
})()
