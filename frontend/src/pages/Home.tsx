
// Home.tsx

import { Slider } from "antd";
import React, { useRef, useState } from "react";
import { Brightness } from "../utils/brightness";
import GreyLevelSlicing from "../utils/greyLevelSlicing";
import { Contrast } from "../utils/contrast";
import { Blur } from "../utils/blur";
import { HighPassFilter } from "../utils/highPassFilter"; 
import { BitwiseSlicing } from "../utils/bitwiseSlicing"; 
import { Hue } from "../utils/hue"; 
import "./Home.css";

const debounce = (func: Function, delay: number) => {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(null, args), delay);
  };
};

export const Home = ({
  image,
  setImage,
  imageOriginal,
  setImageOriginal,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  imageOriginal: string;
  setImageOriginal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const formatter = (value: number | undefined) => `${value}%`;

  const displayImageRef = useRef<HTMLImageElement | null>(null);
  

  const [brightnessSliderValue, setBrightnessSliderValue] = useState<number | undefined>(0);
  const [greyLevelSlicingValue, setGreyLevelSlicingValue] = useState<number[]>([0, 255]);
  const [contrastSliderValue, setContrastSliderValue] = useState<number | undefined>(0);
  const [blurRadius, setBlurRadius] = useState<number>(0);
  const [highPassStrength, setHighPassStrength] = useState<number>(0);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [bitwiseSlicingValue, setBitwiseSlicingValue] = useState<number | undefined>(128); 
  const [hueAngle, setHueAngle] = useState<number>(0); 

  const handleHueChange = (value: number | undefined) => {
    if (value === undefined) return;
    const adjustedValue = value % 360; 
    setHueAngle(adjustedValue);
    debounce((val: number) => {
      setImage(
        Hue({
          angle: val,
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 50)(adjustedValue); 
  };
  
  const handleBrightnessChange = (value: number | undefined) => {
    setBrightnessSliderValue(value);
    debounce((val: number | undefined) => {
      setImage(
        Brightness({
          value: val || 0,
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 50)(value);
  };

  const handleGreyLevelSlicing = (value: number[]) => {
    setGreyLevelSlicingValue(value);
    debounce((val: number[]) => {
      setImage(
        GreyLevelSlicing({
          min: val[0],
          max: val[1],
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 50)(value);
  };

  const handleContrastChange = (value: number | undefined) => {
    setContrastSliderValue(value);
    debounce((val: number | undefined) => {
      setImage(
        Contrast({
          value: val || 0,
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 50)(value);
  };

  const handleBlurChange = (value: number) => {
    setBlurRadius(value);
    debounce((val: number) => {
      setImage(
        Blur({
          radius: val,
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 50)(value);
  };

  const handleHighPassChange = (value: number) => { // Handler for high-pass filter strength change
    setHighPassStrength(value);
    debounce((val: number) => {
      setImage(
        HighPassFilter({
          strength: val,
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 10)(value);
  };

  const handleRotationChange = (value: number | undefined) => {
    setRotationAngle(value || 0);
    debounce((val: number | undefined) => {
      if (val !== undefined) {
        const rotatedImage = rotateImage(imageOriginal, val);
        setImage(rotatedImage);
      }
    }, 50)(value);
  };

  const rotateImage = (imageSrc: string, angle: number): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const img = new Image();
    img.src = imageSrc;

    const width = img.width;
    const height = img.height;

    canvas.width = width;
    canvas.height = height;

    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(img, -width / 2, -height / 2, width, height);

    return canvas.toDataURL("image/png");
  };

 
 
  const handleBitwiseSlicingChange = (value: number | undefined) => {
    setBitwiseSlicingValue(value);
    debounce((val: number | undefined) => {
      setImage(
        BitwiseSlicing({
          threshold: val || 128, // Use 128 as default threshold if undefined
          image: imageOriginal,
          setImage: setImage,
        })
      );
    }, 50)(value); // Debounce with a delay of 50 milliseconds
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = URL.createObjectURL(e.target.files[0]);
      setImage(selectedImage);
      setImageOriginal(selectedImage);
    }
  };

  
  return (
    <div className="flex">
       <div className="w-60 bg-[#f6f6f60b] h-full  flex-shrink-0 p-1 feature-menu">
        
        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2 ">
          Brightness
          <Slider
            value={brightnessSliderValue}
            tooltip={{ formatter }}
            onChange={handleBrightnessChange}
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2 ">
          GreyLevelSlicing
          <Slider
            value={greyLevelSlicingValue}
            range
            defaultValue={[0, 200]}
            min={0}
            max={255}
            onChange={handleGreyLevelSlicing}
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2 ">
          Contrast
          <Slider
            value={contrastSliderValue}
            tooltip={{ formatter }}
            onChange={handleContrastChange}
            min={-100}
            max={100}
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2 ">
          Blur
          <Slider
            value={blurRadius}
            tooltip={{ formatter }}
            onChange={handleBlurChange}
            min={0}
            max={10}
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2 ">
          High Pass Filter
          <Slider
            value={highPassStrength}
            tooltip={{ formatter }}
            onChange={handleHighPassChange}
            min={0}
            max={100} // Adjust maximum strength as needed
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2 ">
          Rotation
          <Slider
            value={rotationAngle}
            tooltip={{ formatter }}
            onChange={handleRotationChange}
            min={-180}
            max={180}
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2">
          Hue
          <Slider
            value={hueAngle}
            tooltip={{ formatter }}
            onChange={handleHueChange}
            min={-180} // Minimum value for hue angle (counterclockwise)
            max={180} // Maximum value for hue angle (clockwise)
          />
        </div>

        <div className="bg-[#8367bb] h-16 w-full rounded-md px-3 py-2 my-2">
          Bit wise Slicing
          <Slider
            value={bitwiseSlicingValue}
            tooltip={{ formatter }}
            onChange={handleBitwiseSlicingChange}
            min={0}
            max={255}
          />
        </div>
      </div>

        <div className="w-full p-4 display-container rounded-md">
          <div className="w-full  bg-slate-300 rounded-md image-container" style={{position:'relative'}}>
            <label htmlFor="upload-input" className="ant-upload-drag-icon">
              {image ? (
                <img
                  ref={displayImageRef}
                  src={image}
                  alt="Uploaded"
                  style={{ width: "100%" }}
                  className="image-container rounded-md"
                />
            
                ) : (
                  <button className="upload-btn"
                    onClick={() => document.getElementById('upload-input')?.click()}
                    
                  >
                    Upload Image
                  </button>
                )}
              </label>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  display: "none"
                }}
              />
              
            </div>
        </div>
      </div>
    );
  };
  