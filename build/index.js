import { MAGError } from './Util/MAGError.js';
import canvas from 'canvas';
import GIFEncoder from 'gifencoder';
const HexRegex = /^[0-9A-Fa-f]{6}$/;
export class Gif {
    width;
    height;
    delay;
    quality;
    repeat;
    frames;
    constructor(width = 500, height = 500) {
        if (!width)
            throw new MAGError('You need to put the width of the gif');
        if (typeof width !== 'number')
            throw new MAGError('Width needs to be a number');
        if (isNaN(width))
            throw new MAGError('The width needs to be a number');
        if (width <= 0)
            throw new MAGError('The width cant be iqual or less than 0');
        if (!height)
            throw new MAGError('You need to put the height of the gif');
        if (isNaN(height))
            throw new MAGError('The height needs to be a number');
        if (height <= 0)
            throw new MAGError('The height cant be iqual or less than 0');
        this.width = ~~width ?? 500;
        this.height = ~~height ?? 500;
        this.delay = 500;
        this.quality = 10;
        this.repeat = true;
        this.frames = [];
    }
    setDelay(delay) {
        if (!delay)
            throw new MAGError('You need to put the delay between frames');
        if (isNaN(delay))
            throw new MAGError('The delay needs to be a number');
        if (delay <= 0)
            throw new MAGError('The delay cannot be less than 0');
        this.delay = ~~delay;
        return this;
    }
    setQuality(quality) {
        if (!quality)
            throw new MAGError('You need to put the quality between images');
        if (isNaN(quality))
            throw new MAGError('The quality needs to be a number');
        if (quality <= 0)
            throw new MAGError('The quality cannot be less than 0');
        if (quality > 10)
            throw new MAGError('Quality 10 is the max');
        this.quality = quality;
        return this;
    }
    setFrames(frame) {
        if (!frame)
            throw new MAGError(`You need to put the frame object, a string, a array or a buffer; recieved a ${typeof frame}`);
        if (Array.isArray(frame)) {
            if (!frame.length)
                throw new MAGError('You need to put at least 1 frame');
            frame.forEach((fr, i) => {
                if (!fr.hasOwnProperty('src') &&
                    !fr.hasOwnProperty('background'))
                    this.frames.push({ src: fr });
                else if (fr.hasOwnProperty('background') ||
                    fr.hasOwnProperty('src')) {
                    this.frames.push(fr);
                }
                else {
                    throw new MAGError(`The value for a frame in the array is not the correct type, recieved: ${typeof fr}, array element: ${i}`);
                }
            });
        }
        else {
            if (!frame.hasOwnProperty('src') &&
                !frame.hasOwnProperty('background'))
                this.frames.push({ src: frame });
            else if (frame.hasOwnProperty('background') ||
                frame.hasOwnProperty('src')) {
                this.frames.push(frame);
            }
            else {
                throw new MAGError(`The value for a frame is not the correct type, recieved: ${typeof frame}`);
            }
        }
        return this;
    }
    setRepeat(v) {
        this.repeat = v ?? !this.repeat;
    }
    async render() {
        if (!this.frames.length)
            throw new MAGError('There is no frames to make a gif');
        const Canvas = canvas.createCanvas(this.width, this.height);
        const ctx = Canvas.getContext('2d');
        const encoder = new GIFEncoder(this.width, this.height);
        encoder.start();
        encoder.setRepeat(this.repeat ? 0 : -1);
        encoder.setDelay(this.delay);
        encoder.setQuality(this.quality);
        for (const Frame of this.frames) {
            if (typeof Frame.src === 'string' && Frame.src.match(HexRegex)) {
                ctx.fillStyle = Frame.src;
                ctx.fillRect(0, 0, Canvas.width, Canvas.height);
            }
            else {
                if (Frame.background) {
                    if (typeof Frame.background === 'string' &&
                        Frame.background.match(HexRegex)) {
                        ctx.fillStyle = Frame.background;
                        ctx.fillRect(0, 0, Canvas.width, Canvas.height);
                    }
                    else {
                        const BackgroundImage = await canvas.loadImage(Frame.background);
                        ctx.drawImage(BackgroundImage, 0, 0, Canvas.width, Canvas.height);
                    }
                }
                else {
                    const Image = await canvas.loadImage(Frame.src);
                    ctx.drawImage(Image, 0, 0, Canvas.width, Canvas.height);
                }
            }
            encoder.addFrame(ctx);
            ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        }
        return encoder.out.getData();
    }
}
