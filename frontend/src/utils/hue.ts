// hue.ts

import { IHue } from "../types/hue.types";

export function Hue({ angle, image, setImage }: IHue): string {
  if (!image) return ""; // Return empty string if no image is provided

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return ""; // Return empty string if canvas context is not supported

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // const angleInRadians = (angle * Math.PI) / 180;
    // const cosAngle = Math.cos(angleInRadians);
    // const sinAngle = Math.sin(angleInRadians);

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      // Convert RGB to HSL
      const r = red / 255;
      const g = green / 255;
      const b = blue / 255;

      const cmax = Math.max(r, g, b);
      const cmin = Math.min(r, g, b);
      const delta = cmax - cmin;

      let hue = 0;
      if (delta !== 0) {
        if (cmax === r) {
          hue = ((g - b) / delta) % 6;
        } else if (cmax === g) {
          hue = ((b - r) / delta) + 2;
        } else {
          hue = ((r - g) / delta) + 4;
        }
      }
      hue = Math.round(hue * 60);
      if (hue < 0) {
        hue += 360;
      }

      // Rotate hue
      hue += angle;
      hue %= 360;
      if (hue < 0) {
        hue += 360;
      }

      // Convert HSL to RGB
      const h = hue / 360;
      const s = 1;
      const l = 0.5;
      const t1 = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const t2 = 2 * l - t1;

      const rgb = [
        h + 1 / 3,
        h,
        h - 1 / 3
      ].map((value) => {
        if (value < 0) {
          value += 1;
        }
        if (value > 1) {
          value -= 1;
        }
        if (6 * value < 1) {
          return t2 + (t1 - t2) * 6 * value;
        }
        if (2 * value < 1) {
          return t1;
        }
        if (3 * value < 2) {
          return t2 + (t1 - t2) * ((2 / 3) - value) * 6;
        }
        return t2;
      }).map((value) => Math.round(value * 255));

      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
    const modifiedImage = canvas.toDataURL("image/png");
    setImage(modifiedImage);
  };

  img.src = image;

  return "";
}
