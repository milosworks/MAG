/// <reference types="node" />
export declare type Image = string | Buffer;
export interface Frame {
    src: Image;
    background?: Image;
}
export declare class Gif {
    width: number;
    height: number;
    delay: number;
    quality: number;
    frames: Frame[];
    /**
     * Create a new gif
     */
    constructor(width?: number, height?: number);
    /**
     * The delay between frames
     */
    setDelay(delay: number): Gif;
    /**
     * The quality of the gif
     */
    setQuality(quality: number): Gif;
    /**
     * Set the frame of the gif
     */
    setFrames(frame: Frame | Image | Frame[] | Image[]): Gif;
    setRepeat(repeat: number): Gif;
    render(): Promise<Buffer | void>;
}
