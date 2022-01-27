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
		.setRepeat(0)
		//We set 3 images that will be 3 frames
		.setFrames([
			'https://im7.ezgif.com/tmp/ezgif-7-e66d442ea9-gif-im/frame_00_delay-0.1s.gif',
			'https://im7.ezgif.com/tmp/ezgif-7-e66d442ea9-gif-im/frame_04_delay-0.1s.gif',
		])

	//Render the image, it will return a Buffer or it will give an error if anything goes wrong
	const Render = await Image.render()

	//Writes the gif in this folder
	fs.writeFileSync(join(__dirname, 'make-a-gif.gif'), Render)
})()
