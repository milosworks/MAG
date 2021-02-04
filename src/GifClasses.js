import { emitWarning } from "process"

export class GifError extends Error {
    /**
     * The error of MAG
     * @param m - The message to send to the error
     * @private
     */
    constructor(m) {
        super()

        this.message = m
        this.name = `GifError`
    }
}

export class GifWarning {
    constructor(m) {
        emitWarning(m, `GifWarning`)
    }
}