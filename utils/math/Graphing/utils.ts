/**
 * Generates a random color in the HSL (Hue, Saturation, Lightness) format.
 * @returns A string representing the randomly generated color.
 */
export const getRandomColor = (): string => {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`
}
