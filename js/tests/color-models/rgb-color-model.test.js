import { describe, test, expect } from "vitest";
import { RgbColorModel } from "../../src/color-models/rgb-color-model";

describe("RGB Color Model", () => {
  test("fromRgb: valid RGB values", () => {
    const color = new RgbColorModel();
    color.fromRgb(255, 0, 128);
    expect(color.red).toBe(255);
    expect(color.green).toBe(0);
    expect(color.blue).toBe(128);
    expect(color.hex).toBe((255 << 16) | (0 << 8) | 128); // 0xff0080
  });

  test("fromRgb: edge case RGB values", () => {
    const color1 = new RgbColorModel();
    color1.fromRgb(0, 0, 0);
    expect(color1.red).toBe(0);
    expect(color1.green).toBe(0);
    expect(color1.blue).toBe(0);
    expect(color1.hex).toBe(0);

    const color2 = new RgbColorModel();
    color2.fromRgb(255, 255, 255);
    expect(color2.red).toBe(255);
    expect(color2.green).toBe(255);
    expect(color2.blue).toBe(255);
    expect(color2.hex).toBe(0xffffff);
  });

  test("fromRgb: invalid RGB values", () => {
    const color = new RgbColorModel();
    expect(() => color.fromRgb(-1, 0, 0)).toThrowError("Invalid color value");
    expect(() => color.fromRgb(0, 256, 0)).toThrowError("Invalid color value");
    expect(() => color.fromRgb(0, 0, 300)).toThrowError("Invalid color value");
    expect(() => color.fromRgb(NaN, 0, 0)).toThrowError("Invalid color value");
  });

  test("fromHex: valid HEX value", () => {
    const color = new RgbColorModel();
    color.fromHex(0xff0000);
    expect(color.red).toBe(255);
    expect(color.green).toBe(0);
    expect(color.blue).toBe(0);
    expect(color.hex).toBe(0xff0000);
  });

  test("fromHex: edge case HEX values", () => {
    const color1 = new RgbColorModel();
    color1.fromHex(0x000000);
    expect(color1.red).toBe(0);
    expect(color1.green).toBe(0);
    expect(color1.blue).toBe(0);
    expect(color1.hex).toBe(0x000000);

    const color2 = new RgbColorModel();
    color2.fromHex(0xffffff);
    expect(color2.red).toBe(255);
    expect(color2.green).toBe(255);
    expect(color2.blue).toBe(255);
    expect(color2.hex).toBe(0xffffff);
  });

  test("fromHex: invalid HEX value", () => {
    const color = new RgbColorModel();
    expect(() => color.fromHex(-1)).toThrowError("Invalid hex color code");
    expect(() => color.fromHex(0x1000000)).toThrowError(
      "Invalid hex color code"
    );
    expect(() => color.fromHex(NaN)).toThrowError("Invalid hex color code");
  });

  test("fromHex and fromRgb interaction", () => {
    const color = new RgbColorModel();
    color.fromRgb(10, 20, 30);
    color.fromHex(0x405060);
    expect(color.red).toBe(64);
    expect(color.green).toBe(80);
    expect(color.blue).toBe(96);
    expect(color.hex).toBe(0x405060);

    const color2 = new RgbColorModel();
    color2.fromHex(0xabcdef);
    color2.fromRgb(100, 150, 200);
    expect(color2.red).toBe(100);
    expect(color2.green).toBe(150);
    expect(color2.blue).toBe(200);
    expect(color2.hex).toBe((100 << 16) | (150 << 8) | 200);
  });

  test("calculateHex method", () => {
    const color1 = new RgbColorModel();
    color1.fromRgb(10, 20, 30);
    expect(color1.hex).toBe((10 << 16) | (20 << 8) | 30); //0x0a141e
    const color2 = new RgbColorModel();
    color2.fromRgb(255, 0, 0);
    expect(color2.hex).toBe(0xff0000);
    const color3 = new RgbColorModel();
    color3.fromRgb(0, 255, 0);
    expect(color3.hex).toBe(0x00ff00);
    const color4 = new RgbColorModel();
    color4.fromRgb(0, 0, 255);
    expect(color4.hex).toBe(0x0000ff);
  });
});
