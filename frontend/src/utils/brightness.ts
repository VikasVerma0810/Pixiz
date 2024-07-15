import { IBrightness } from "../types/brightness.types";

export function Brightness({ value, image, setImage }: IBrightness): string {
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

  // Adjust brightness
  const adjustment = value || 0; // If value is undefined, use 0 as default
  for (let i = 0; i < data.length; i += 4) {
    // Each pixel consists of 4 values: red, green, blue, and alpha
    // Adjust the brightness of each color channel
    if (adjustment > 0) {
      data[i] += adjustment * 2.55; // Red channel
      data[i + 1] += adjustment * 2.55; // Green channel
      data[i + 2] += adjustment * 2.55; // Blue channel
    } else {
      data[i] -= Math.abs(adjustment) * 2.55; // Red channel
      data[i + 1] -= Math.abs(adjustment) * 2.55; // Green channel
      data[i + 2] -= Math.abs(adjustment) * 2.55; // Blue channel
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
