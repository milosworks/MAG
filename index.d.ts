
declare class Gif {
    private width: number

    private height: number

    private imagesArray: string[]

    private colorsArray: string[]

    private background: string | undefined

    /**
     * Create a new gif
     * @param width - The width of the gif
     * @param height - The heigth of the gif
     */
    constructor(width: number, height: number);

    /**
     * This function is only for the gifs that uses images not colors, makes the background of the gif with a color
     * @param color - The color of the background
     */
    public setBackground(color: string)

    /**
     * Set the delay between the images
     * @param delay - The delay between the images
     */
    public setDelay(delay: number)

    /**
     * Load the images that will be in the gif
     * @param images - The images/paths to load in the gif
     */
    public setImages(...images: string[])

    /**
     * Load the colors that will be in the gif
     * @param colors - The colors to load in the gif
     */
    public setColors(...colors: string[])

    /**
     * Create the gif with the options that you give
     * @async
     */
    public create(): Promise<Buffer>
}

declare module 'make-a-gif' {
    export {
        Gif
    }
}