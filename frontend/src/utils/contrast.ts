// Contrast.ts
import { IContrast } from "../types/contrast.types";

export function Contrast({ value, image, setImage }: IContrast): string {
  if (!image) return ""; // Return empty string if no image is provided

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

  // Calculate the factor to adjust contrast
  const factor = (259 * (value + 255)) / (255 * (259 - value));

  // Adjust contrast
  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128; // Red channel
    data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green channel
    data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue channel
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
