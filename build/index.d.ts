/// <reference types="node" />
import { Frame as FrameI } from 'imagescript';
interface Frame {
    src: string | Uint8Array;
    duration?: number;
    background?: string | Uint8Array;
}
export declare class Gif {
    width: number;
    height: number;
    frames: FrameI[];
    loops: number;
    quality: number;
    constructor(width: number, height: number, quality?: number);
    setLoops(loops: number): void;
    setFrames(frames: Frame | Frame[]): Promise<void>;
    addFrame(frame: Frame): Promise<void>;
    encode(arrayBuffer?: boolean): Promise<Uint8Array | Buffer>;
}
export {};
