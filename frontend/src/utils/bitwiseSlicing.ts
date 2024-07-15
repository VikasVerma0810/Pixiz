// bitwiseSlicing.ts

import { IBitwiseSlicing } from "../types/bitwiseSlicing.types";

export function BitwiseSlicing({ threshold, image, setImage }: IBitwiseSlicing): string {
  if (!image) return ""; 

  // Create a new image element
  const img = new Image();
  img.src = image;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return ""; // Return empty string if canvas context is not supported

  // Set canvas dimensions to match image dimensions
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the image onto the canvas
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Get the image data from the canvas
  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  // Apply bit-wise slicing
  const adjustedThreshold = threshold || 128; // If threshold is undefined, use 128 as default
  const maxIntensity = 255; // Maximum intensity for an 8-bit image
  for (let i = 0; i < data.length; i += 4) {
    const intensity = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (intensity <= adjustedThreshold) {
      // Set pixel to zero if intensity is less than or equal to the threshold
      data[i] = data[i + 1] = data[i + 2] = 0;
    } else {
      // Set pixel to maximum intensity otherwise
      data[i] = data[i + 1] = data[i + 2] = maxIntensity;
    }
  }

  // Put the modified image data back onto the canvas
  ctx.putImageData(imageData, 0, 0);

  // Convert the canvas content back to a data URL
  const modifiedImage = canvas.toDataURL("image/png");

  // Update the state with the modified image
  setImage(modifiedImage);

  // Return the data URL of the modified image
  return modifiedImage;
}
