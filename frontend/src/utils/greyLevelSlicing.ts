import { Dispatch, SetStateAction } from "react";

const GreyLevelSlicing = ({
  min,
  max,
  image,
  setImage,
}: {
  min: number;
  max: number;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const avg = (red + green + blue) / 3;

        if (avg >= min && avg <= max) {
          // Calculate the new intensity based on the range
          const newIntensity = Math.round((255 * (avg - min)) / (max - min));
          // Set each channel to the new intensity
          data[i] = data[i + 1] = data[i + 2] = newIntensity;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      const modifiedImage = canvas.toDataURL('image/png');
      setImage(modifiedImage); // Update the state with the modified image
    };

    img.src = image;
  }

  return ''; // Return empty string if something goes wrong
};

export default GreyLevelSlicing;
