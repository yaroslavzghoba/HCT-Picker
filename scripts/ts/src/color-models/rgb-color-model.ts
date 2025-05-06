import { HexUtils } from "../utils/hex-utils";

// Represents a color using red, green, and blue components.
class RgbColorModel implements ColorModel {

    red: number = 0;    // The color's red component.
    green: number = 0;  // The color's green component.
    blue: number = 0;   // The color's blue component.
    hex: number;        // A hexadecimal color code.

    constructor() {
        this.hex = this.calculateHex();  // Init the HEX using RGB values.
    }
    
    // Check if the value is a number between 0 and 255.
    private validateColorValue(value: number): void {
        if (typeof value !== 'number' || (value < 0 || value > 255) || isNaN(value)) {
            throw new Error('Invalid color value. It should be a number between 0 and 255.');
        };
    };

    // Convert a RGB color to a hexadecimal color code.
    private calculateHex(): number {
        return (this.red << 16) | (this.green << 8) | this.blue;
    }

    // Define a color using hexadecimal color code.
    fromHex(hex: number): void {
        HexUtils.validateNumHex(hex);
            
        this.red = (hex >> 16) & 255;
        this.green = (hex >> 8) & 255;
        this.blue = hex & 255;
        this.hex = hex;
    };

    // Define a color using values of red, green, and blue.
    fromRgb(r: number, g: number, b: number): void {
        this.validateColorValue(r);
        this.validateColorValue(g);
        this.validateColorValue(b);

        this.red = r;
        this.green = g;
        this.blue = b;
        this.hex = this.calculateHex();
    };
};

export { RgbColorModel };