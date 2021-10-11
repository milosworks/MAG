export class MAGError extends Error {
    /**
     * Throws an error
     */
    constructor(message) {
        super(message);
        this.name = 'MAGError';
    }
}
