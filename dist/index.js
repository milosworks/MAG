"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gif = void 0;
const GIFEncoder = require("gif-encoder-2");
const canvas_1 = require("canvas");
const GifClasses_1 = require("./GifClasses");
class Gif {
    constructor(width = 500, height = 500) {
        if (!width)
            throw new GifClasses_1.GifError(`The width of the gif cant be undefined`);
        if (!height)
            throw new GifClasses_1.GifError(`The height of the gif cant be undefined`);
        this.width = width;
        this.height = height;
        this.delay = 1000;
        this.imagesArray = [];
        this.colorsArray = [];
        this.background = undefined;
    }
    /**
     * This function is only for the gifs that uses images not colors, makes the background of the gif with a color
     * @param color - The color of the background
     */
    setBackground(color) {
        if (!color)
            throw new GifClasses_1.GifError(`You need to put a valid color`);
        this.background = color;
        return this;
    }
    /**
     * Set the delay between the images
     * @param delay - The delay between the images
     */
    setDelay(delay) {
        if (!delay)
            throw new GifClasses_1.GifError(`You need to put a delay`);
        this.delay = delay;
        return this;
    }
    /**
     * Load the images that will be in the gif
     * @param images - The images/paths to load in the gif
     */
    setImages(...images) {
        if (!images && images.length === 0)
            throw new GifClasses_1.GifError(`You need to put some images/paths`);
        if (images.length > 50)
            new GifClasses_1.GifWarning(`You have entered more than 50 images, the gif will take longer to create`);
        this.imagesArray = images;
        return this;
    }
    /**
     * Load the colors that will be in the gif
     * @param colors - The colors to load in the gif
     */
    setColors(...colors) {
        if (!colors && colors.length === 0)
            throw new GifClasses_1.GifError(`You need to put some colors`);
        if (colors.length > 50)
            new GifClasses_1.GifWarning(`You have entered more than 50 colors, the gif will take longer to create`);
        this.colorsArray = colors;
        return this;
    }
    /**
     * Create the gif with the options that you give
     * @async
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(this.width, this.height), ctx = canvas.getContext('2d'), encoder = new GIFEncoder(this.width, this.height);
            if (!this.colorsArray.length && !this.imagesArray.length)
                throw new GifClasses_1.GifError(`You dont input any colors or images`);
            encoder.start();
            encoder.setDelay(this.delay);
            if (this.colorsArray.length !== 0) {
                for (let color of this.colorsArray) {
                    ctx.fillStyle = color;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    encoder.addFrame(ctx);
                }
            }
            if (this.imagesArray.length !== 0) {
                for (let preimg of this.imagesArray) {
                    if (this.background) {
                        ctx.fillStyle = this.background;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    let img = yield canvas_1.loadImage(preimg);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    encoder.addFrame(ctx);
                }
            }
            encoder.finish();
            return encoder.out.getData();
        });
    }
}
exports.Gif = Gif;
