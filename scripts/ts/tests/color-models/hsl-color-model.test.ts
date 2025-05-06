import { describe, test, expect } from "vitest";
import { HslColorModel } from "../../src/color-models/hsl-color-model";

describe("HSL Color Model", () => {
  test("fromHsl: valid HSL values", () => {
    const color = new HslColorModel();
    color.fromHsl(120, 50, 70);
    expect(color.hue).toBe(120);
    expect(color.saturation).toBe(50);
    expect(color.lightness).toBe(70);
    expect(color.hex).toBe(0x8cd98c);
  });

  test("fromHsl: edge case HSL values", () => {
    const color1 = new HslColorModel();
    color1.fromHsl(0, 0, 0);
    expect(color1.hue).toBe(0);
    expect(color1.saturation).toBe(0);
    expect(color1.lightness).toBe(0);
    expect(color1.hex).toBe(0x000000);

    const color2 = new HslColorModel();
    color2.fromHsl(360, 100, 100);
    expect(color2.hue).toBe(360);
    expect(color2.saturation).toBe(100);
    expect(color2.lightness).toBe(100);
    expect(color2.hex).toBe(0xffffff);
  });

  test("fromHsl: invalid HSL values", () => {
    const color = new HslColorModel();
    expect(() => color.fromHsl(-1, 0, 0)).toThrowError("Invalid hue value");
    expect(() => color.fromHsl(0, 101, 0)).toThrowError("Invalid saturation value");
    expect(() => color.fromHsl(0, 0, 101)).toThrowError("Invalid lightness value");
    expect(() => color.fromHsl(NaN, 0, 0)).toThrowError("Invalid hue value");
  });

  test("fromHex: valid HEX value", () => {
    const color = new HslColorModel();
    color.fromHex(0x4f82b5);
    expect(color.hue).toBe(210);
    expect(color.saturation).toBe(41);
    expect(color.lightness).toBe(51); 
    expect(color.hex).toBe(0x4f82b5);
  });

  test("fromHex: edge case HEX values", () => {
    const color1 = new HslColorModel();
    color1.fromHex(0x000000);
    // expect(color1.hue).toBe(0);
    expect(color1.saturation).toBe(0);
    expect(color1.lightness).toBe(0);
    expect(color1.hex).toBe(0x000000);

    const color2 = new HslColorModel();
    color2.fromHex(0xffffff);
    expect(color2.hue).toBe(0);
    expect(color2.saturation).toBe(0);
    expect(color2.lightness).toBe(100);
    expect(color2.hex).toBe(0xffffff);
  });

  test("fromHex: invalid HEX value", () => {
    const color = new HslColorModel();
    expect(() => color.fromHex(-1)).toThrowError("Invalid hex color code");
    expect(() => color.fromHex(0x1000000)).toThrowError("Invalid hex color code");
    expect(() => color.fromHex(NaN)).toThrowError("Invalid hex color code");
  });

  test("fromHex and fromHsl interaction", () => {
    const color = new HslColorModel();
    color.fromHsl(120, 50, 100);
    color.fromHex(0x0000ff);
    expect(color.hue).toBe(240);
    expect(color.saturation).toBe(100);
    expect(color.lightness).toBe(50);
    expect(color.hex).toBe(0x0000ff);

    const color2 = new HslColorModel();
    color2.fromHex(0x00ff00);
    color2.fromHsl(240, 100, 50);
    expect(color2.hue).toBe(240);
    expect(color2.saturation).toBe(100);
    expect(color2.lightness).toBe(50);
    expect(color2.hex).toBe(0x0000ff);
  });

  test("calculateHex method", () => {
    const color1 = new HslColorModel();
    color1.fromHsl(10, 20, 30);
    expect(color1.hex).toBe(0x5c423d);
    const color2 = new HslColorModel();
    color2.fromHsl(0, 100, 50);
    expect(color2.hex).toBe(0xff0000);
    const color3 = new HslColorModel();
    color3.fromHsl(120, 100, 50);
    expect(color3.hex).toBe(0x00ff00);
    const color4 = new HslColorModel();
    color4.fromHsl(240, 100, 50);
    expect(color4.hex).toBe(0x0000ff);
  });
});
