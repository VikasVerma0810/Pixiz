import { IBlur } from "../types/blur.types";

export function Blur({ radius, image, setImage }: IBlur): string {
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

    // Apply blur effect
    const blurRadius = Math.abs(radius); // Ensure radius is positive
    for (let i = 0; i < blurRadius; i++) {
        ctx.filter = `blur(${blurRadius}px)`;
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    }

    // Convert the canvas content back to a data URL
    const modifiedImage = canvas.toDataURL("image/png");

    // Update the state with the modified image
    setImage(modifiedImage);

    // Return the data URL of the modified image
    return modifiedImage;
}