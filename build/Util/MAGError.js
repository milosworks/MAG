export class MAGError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MAGError';
    }
}
