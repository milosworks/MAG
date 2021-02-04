import * as GIFEncoder from 'gif-encoder-2'
import { createCanvas, loadImage } from 'canvas'
import { GifError, GifWarning } from './GifClasses.js'

export class Gif {
    /**
     * Create a new gif
     * @param {number} width - The width of the gif
     * @param {number} height - The heigth of the gif
     */
    constructor(width = 500, height = 500) {
        if (!width) throw new GifError(`The width of the gif cant be undefined`)
        if (!height) throw new GifError(`The height of the gif cant be undefined`)

        this.width = width
        this.height = height
        this.delay = 1000
        this.imagesArray = []
        this.colorsArray = []
        this.background = undefined
    }
    /**
     * This function is only for the gifs that uses images not colors, makes the background of the gif with a color
     * @param {string} color - The color of the background
     */
    setBackground(color) {
        if (!color) throw new GifError(`You need to put a valid color`)

        this.background = color

        return this
    }
    /**
     * Set the delay between the images
     * @param {number} delay - The delay between the images
     */
    setDelay(delay) {
        if (!delay) throw new GifError(`You need to put a delay`)

        this.delay = delay

        return this
    }
    /**
     * Load the images that will be in the gif
     * @param images - The images/paths to load in the gif
     */
    setImages(...images) {
        if (!images && images.length === 0) throw new GifError(`You need to put some images/paths`)
        if (images.length > 50) new GifWarning(`You have entered more than 50 images, the gif will take longer to create`)

        this.imagesArray = images

        return this
    }
    /**
     * Load the colors that will be in the gif
     * @param colors - The colors to load in the gif
     */
    setColors(...colors) {
        if (!colors && colors.length === 0) throw new GifError(`You need to put some colors`)
        if (colors.length > 50) new GifWarning(`You have entered more than 50 colors, the gif will take longer to create`)

        this.colorsArray = colors

        return this
    }
    /**
     * Create the gif with the options that you give
     * @returns {Promise<Buffer>}
     * @async
     */
    async create() {
        const canvas = createCanvas(this.width, this.height),
            ctx = canvas.getContext('2d'),
            encoder = new GIFEncoder(this.width, this.height)

        if (!this.colorsArray.length && !this.imagesArray.length) throw new GifError(`You dont input any colors or images`)

        encoder.start()
        encoder.setDelay(this.delay)

        if (this.colorsArray.length !== 0) {
            for (let color of this.colorsArray) {
                ctx.fillStyle = color
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                encoder.addFrame(ctx)
            }
        }
        if (this.imagesArray.length !== 0) {
            for (let preimg of this.imagesArray) {
                if (this.background) {
                    ctx.fillStyle = this.background
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                }

                let img = await loadImage(preimg)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                encoder.addFrame(ctx)
            }
        }
        encoder.finish()

        return encoder.out.getData()
    }
}