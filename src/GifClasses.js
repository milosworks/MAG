const { emitWarning } = require('process')

module.exports = class GifError extends Error {
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

module.exports = class GifWarning {
    constructor(m) {
        emitWarning(m, `GifWarning`)
    }
}