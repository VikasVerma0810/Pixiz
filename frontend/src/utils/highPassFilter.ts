// highPassFilter.ts

import { Dispatch, SetStateAction } from "react";

interface IHighPassFilter {
  strength: number;
  image?: string;
  setImage: Dispatch<SetStateAction<string>>;
}

export function HighPassFilter({ strength, image, setImage }: IHighPassFilter): string {
  if (!image) return "";

  const img = new Image();
  img.src = image;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const width = img.width;
  const height = img.height;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const kernel = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
  ];

  const factor = strength / 100;

  const clamp = (value: number) => Math.max(0, Math.min(255, value));

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const pixelY = y + ky;
          const pixelX = x + kx;
          const offset = (pixelY * width + pixelX) * 4;

          const weight = kernel[ky + 1][kx + 1];

          sumR += data[offset] * weight;
          sumG += data[offset + 1] * weight;
          sumB += data[offset + 2] * weight;
        }
      }

      const offset = (y * width + x) * 4;
      const sharpenedR = clamp(data[offset] + sumR * factor);
      const sharpenedG = clamp(data[offset + 1] + sumG * factor);
      const sharpenedB = clamp(data[offset + 2] + sumB * factor);

      data[offset] = sharpenedR;
      data[offset + 1] = sharpenedG;
      data[offset + 2] = sharpenedB;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const modifiedImage = canvas.toDataURL("image/png");
  setImage(modifiedImage);

  return modifiedImage;
}
