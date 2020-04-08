export default class Color {
    MIN_VALUE = 0
    MAX_VALUE = 255
    constructor(hex) {
        this.red = hex.substring(1, 3)
        this.green = hex.substring(3, 5)
        this.blue = hex.substring(5, 7)
        this.alpha = hex.substring(7, 9)
    }

    transparentValue() {
        const OFFSET = 0.4
        this.alpha = parseInt(parseInt(this.alpha, 16) * OFFSET).toString(16)
        return this.value()
    }

    solidValue() {
        this.alpha = 'ff'
        return this.value()
    }

    value() {
        return '#' + this.red + this.green + this.blue + this.alpha
    }
}
