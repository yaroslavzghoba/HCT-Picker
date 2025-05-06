import convert from 'color-convert';
import { HexUtils } from "../utils/hex-utils";

// Represents a color using hue, saturation, and lightness components.
class HslColorModel implements ColorModel {

  hue: number = 0;         // The color's hue component.
  saturation: number = 0;  // The color's saturation component.
  lightness: number = 0;   // The color's lightness component.
  hex: number;             // A hexadecimal color code.

  constructor() {
    this.hex = this.calculateHex();
  }

  // Convert a HSL to a HEX.
  private calculateHex(): number {
    const strHex = convert.hsl.hex(this.hue, this.saturation, this.lightness);
    return HexUtils.stringToHex(strHex);
  }

  private calculateHsl(): Array<number> {
    const strHex = HexUtils.hexToString(this.hex);
    console.log("strHex:" + strHex)
    return convert.hex.hsl(strHex);
  }

  // Define a color using hexadecimal color code.
  fromHex(hex: number): void {
    if (typeof hex !== "number" || hex < 0x000000 || hex > 0xffffff || isNaN(hex)) {
      throw new Error("Invalid hex color code. It should be a number between 0x000000 and 0xffffff.");
    };

    this.hex = hex;
    const hsl = this.calculateHsl();
    this.hue = hsl[0];
    this.saturation = hsl[1];
    this.lightness = hsl[2];
  }

  // Define a color using values of hue, saturation, and lightness.
  fromHsl(h: number, s: number, l: number): void {
    if (typeof h !== "number" || isNaN(h) || h < 0 || h > 360) {
      throw new Error("Invalid hue value. It should be a number between 0 and 360.");
    } else if (typeof s !== "number" || isNaN(s) || s < 0 || s > 100) {
      throw new Error("Invalid saturation value. It should be a number between 0 and 100.");
    } else if (typeof l !== "number" || isNaN(l) || l < 0 || l > 100) {
      throw new Error("Invalid lightness value. It should be a number between 0 and 100.");
    }

    this.hue = h;
    this.saturation = s;
    this.lightness = l;
    this.hex = this.calculateHex();
  }
}

export { HslColorModel };