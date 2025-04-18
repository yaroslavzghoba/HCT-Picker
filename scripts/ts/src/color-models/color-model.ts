// Contains properties those can represent a color.
interface ColorModel {

  // A hexadecimal code of the color.
  hex: number;
    
  // Define a color using hexadecimal color code.
  fromHex(hex: number): void;
}
