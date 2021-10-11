export class MAGError extends Error {
	/**
	 * Throws an error
	 */
	constructor(message: string) {
		super(message)

		this.name = 'MAGError'
	}
}
