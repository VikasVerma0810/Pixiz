// flipImage.ts

import { IFlipImage } from "../types/flipImage.types";

export function flipImage({ direction, image, setImage }: IFlipImage): string {
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

  // Flip the image
  if (direction === "horizontal") {
    ctx.translate(img.width, 0);
    ctx.scale(-1, 1);
  } else if (direction === "vertical") {
    ctx.translate(0, img.height);
    ctx.scale(1, -1);
  }

  // Draw the flipped image onto the canvas
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // Convert the canvas content back to a data URL
  const flippedImage = canvas.toDataURL("image/png");

  // Update the state with the flipped image
  setImage(flippedImage);

  // Return the data URL of the flipped image
  return flippedImage;
}
