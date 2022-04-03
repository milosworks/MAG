import { GIF, Frame as FrameI, decode, Image } from 'imagescript'
import fetch from 'node-fetch'

import { checkTypes, checkNumber } from './utils/checkTypes.js'

interface Frame {
	/**
	 * The source image it can be an url or a buffer
	 */
	src: string | Uint8Array

	/**
	 * The duration of the GIF in milliseconds
	 * @default 1000
	 */
	duration?: number

	/**
	 * The background image
	 */
	background?: string | Uint8Array
}

export class Gif {
	width: number
	height: number
<<<<<<< HEAD
	private frames: FrameI[]
=======
	delay: number
	quality: number
	repeat: boolean
	frames: Frame[]
	skipOnFail: boolean
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7

	/**
	 * The number of loops the gif will play
	 * @default -1 -1 is infinite loops
	 */
	loops: number

	/**
	 * The quality of the gif
	 * @default 1 - GIF quality ((best) 1..30 (worst))
	 */
	quality: number

	/**
	 * Creates a gif
	 * @argument width - The width of the gif
	 * @argument height - The height of the gif
	 * @argument quality - The quality of the gif ((best) 1..30 (worst))
	 */
	constructor(width: number, height: number, quality?: number) {
		if (!width) throw new Error('The width of the Gif is required')
		if (!height) throw new Error('The height of the Gif is required')
		checkTypes(width, 'number', 'width')
		checkTypes(height, 'number', 'height')
		checkNumber(width, 'width')
		checkNumber(height, 'height')

		this.height = height
		this.width = width
		this.loops = -1
		this.quality = quality || 1
		this.frames = []
		this.skipOnFail = true
	}

	/**
	 * 	The number of loops the gif will play
	 * @default -1 -1 is infinite loops
	 */
	setLoops(loops: number) {
		if (!loops) throw new Error('The loops are required')
		if (isNaN(loops)) throw new Error('The loops needs to be a number')
		if (loops <= -1) throw new Error('The loops cant be less than -1')

		this.loops = loops
	}

	/**
	 * Add frames to the gif
	 * @argument frame - The frames to add
	 */
<<<<<<< HEAD
	async setFrames(frames: Frame | Frame[]) {
		if (!frames) throw new Error('The frames are required')
		if (!Array.isArray(frames)) frames = [frames]
		if (!frames.length) throw new Error('The frames are required')
		if (frames.length <= 1)
			throw new Error('You need to add more than one frame')
=======
	setQuality(quality: number): Gif {
		if (!quality)
			throw new MAGError('You need to put the quality between images')
		if (isNaN(quality))
			throw new MAGError('The quality needs to be a number')
		if (quality <= 0)
			throw new MAGError('The quality cannot be less than 0')
		if (quality > 10) throw new MAGError('Quality 10 is the max')
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7

		for (const frame of frames) {
			await this.addFrame(frame)
		}
	}

	/**
	 * Add a frame to the gif
	 * @argument frame - The frame to add
	 */
	async addFrame(frame: Frame) {
		if (!frame) throw new Error('The frame is required')
		if (!frame.src) throw new Error('The src is required')

		const img = new Image(this.width, this.height)

		if (typeof frame.background === 'string') {
			const imageres = await fetch(frame.background)
			const buf = await imageres.arrayBuffer()
			frame.background = new Uint8Array(buf)
		}
		if (typeof frame.src === 'string') {
			const imageres = await fetch(frame.src)
			const buf = await imageres.arrayBuffer()
			frame.src = new Uint8Array(buf)
		}
		if (frame.duration && isNaN(frame.duration))
			throw new Error('The duration needs to be a number')
		if (frame.duration && frame.duration <= 0)
			throw new Error('The duration cant be less than 0')

		frame.duration = frame.duration || 1000

		if (frame.background) {
			const _background = await decode(frame.background, true)
			if (_background instanceof GIF)
				throw new Error(
					'Gifs are not supported at this moment, please get the frames of the gif and put them as frames'
				)

			img.composite(_background)
		}

		const _img = await decode(frame.src, true)
		if (_img instanceof GIF)
			throw new Error(
				'Gifs are not supported at this moment, please get the frames of the gif and put them as frames'
			)

		img.composite(_img)

		this.frames.push(
			FrameI.from(img, frame.duration, 0, 0, FrameI.DISPOSAL_BACKGROUND)
		)
	}

	async decode() {
		const gif = new GIF(this.frames, this.loops)

<<<<<<< HEAD
		return gif.encode(this.quality)
=======
	/**
	 * Set to true to skip frame on fetch error, false to throw error on fetch error
	 */
	setSkipOnFail(v: boolean) {
		this.skipOnFail = v ?? !this.skipOnFail
	}

	async render(): Promise<Buffer | void> {
		if (!this.frames.length)
			throw new MAGError('There is no frames to make a gif')

		const Canvas = canvas.createCanvas(this.width, this.height)
		const ctx = Canvas.getContext('2d')
		const encoder = new GIFEncoder(this.width, this.height)

		encoder.start()
		encoder.setRepeat(this.repeat ? 0 : -1)
		encoder.setDelay(this.delay)
		encoder.setQuality(this.quality)

		for (const Frame of this.frames) {
			if (typeof Frame.src === 'string' && Frame.src.match(HexRegex)) {
				ctx.fillStyle = Frame.src
				ctx.fillRect(0, 0, Canvas.width, Canvas.height)
			} else {
				if (Frame.background) {
					if (
						typeof Frame.background === 'string' &&
						Frame.background.match(HexRegex)
					) {
						ctx.fillStyle = Frame.background
						ctx.fillRect(0, 0, Canvas.width, Canvas.height)
					} else {
						const BackgroundImage = await canvas.loadImage(
							Frame.background
						)

						ctx.drawImage(
							BackgroundImage,
							0,
							0,
							Canvas.width,
							Canvas.height
						)
					}
				} else {
					const Image = await canvas
						.loadImage(Frame.src)
						.catch((e) => {
							if (!this.skipOnFail) throw e
							ctx.clearRect(0, 0, Canvas.width, Canvas.height)
							return null
						})
					if (!Image) continue

					ctx.drawImage(Image, 0, 0, Canvas.width, Canvas.height)
				}
			}

			encoder.addFrame(ctx as CanvasRenderingContext2D)

			ctx.clearRect(0, 0, Canvas.width, Canvas.height)
		}

		return encoder.out.getData()
>>>>>>> 5bbdc258e42e1025561e04183d51688ae0be45b7
	}
}
