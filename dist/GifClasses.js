"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GifWarning = exports.GifError = void 0;
const process_1 = require("process");
class GifError extends Error {
    /**
     * The error of MAG
     * @param m - The message to send to the error
     * @private
     */
    constructor(m) {
        super();
        this.message = m;
        this.name = `GifError`;
    }
}
exports.GifError = GifError;
class GifWarning {
    constructor(m) {
        process_1.emitWarning(m, `GifWarning`);
    }
}
exports.GifWarning = GifWarning;
