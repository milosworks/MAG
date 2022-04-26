import phin from 'phin';
import { GIF, Frame as FrameI, decode, Image } from 'imagescript';
import { checkTypes, checkNumber } from './utils/checkTypes.js';
export class Gif {
    width;
    height;
    frames;
    loops;
    quality;
    constructor(width, height, quality) {
        if (!width)
            throw new Error('The width of the Gif is required');
        if (!height)
            throw new Error('The height of the Gif is required');
        checkTypes(width, 'number', 'width');
        checkTypes(height, 'number', 'height');
        checkNumber(width, 'width');
        checkNumber(height, 'height');
        this.height = height;
        this.width = width;
        this.loops = -1;
        this.quality = quality || 1;
        this.frames = [];
    }
    setLoops(loops) {
        if (!loops)
            throw new Error('The loops are required');
        if (isNaN(loops))
            throw new Error('The loops needs to be a number');
        if (loops <= -1)
            throw new Error('The loops cant be less than -1');
        this.loops = loops;
    }
    async setFrames(frames) {
        if (!frames)
            throw new Error('The frames are required');
        if (!Array.isArray(frames))
            frames = [frames];
        if (!frames.length)
            throw new Error('The frames are required');
        if (frames.length <= 1)
            throw new Error('You need to add more than one frame');
        for (const frame of frames) {
            await this.addFrame(frame);
        }
    }
    async addFrame(frame) {
        if (!frame)
            throw new Error('The frame is required');
        if (!frame.src)
            throw new Error('The src is required');
        const img = new Image(this.width, this.height);
        if (typeof frame.background === 'string') {
            const imageres = await phin(frame.background);
            const buf = Buffer.from(imageres.body);
            frame.background = new Uint8Array(buf);
        }
        if (typeof frame.src === 'string') {
            const imageres = await phin(frame.src);
            const buf = Buffer.from(imageres.body);
            frame.src = new Uint8Array(buf);
        }
        if (frame.duration && isNaN(frame.duration))
            throw new Error('The duration needs to be a number');
        if (frame.duration && frame.duration <= 0)
            throw new Error('The duration cant be less than 0');
        frame.duration = frame.duration || 1000;
        if (frame.background) {
            const _background = await decode(frame.background, true);
            if (_background instanceof GIF)
                throw new Error('Gifs are not supported at this moment, please get the frames of the gif and put them as frames');
            img.composite(_background);
        }
        const _img = await decode(frame.src, true);
        if (_img instanceof GIF)
            throw new Error('Gifs are not supported at this moment, please get the frames of the gif and put them as frames');
        img.composite(_img);
        this.frames.push(FrameI.from(img, frame.duration, 0, 0, FrameI.DISPOSAL_BACKGROUND));
    }
    async encode() {
        const gif = new GIF(this.frames, this.loops);
        return gif.encode(this.quality);
    }
}
