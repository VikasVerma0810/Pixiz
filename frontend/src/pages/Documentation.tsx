import React, { useState } from 'react';
import { Card } from 'antd';
import './Documentation.css'; // Import the CSS file for styling

// Import your images
import brightnessImage from '../images/brightness.png';
import contrastImage from '../images/contrast.png';

const tabList = [
  {
    key: 'brightness',
    tab: 'Brightness Adjustment',
  },
  {
    key: 'contrast',
    tab: 'Contrast Enhancement',
  },
  {
    key: 'blur',
    tab: 'Blur',
  },
  {
    key: 'sharpen',
    tab: 'Sharpen',
  },
  {
    key: 'grayscale',
    tab: 'Grayscale Conversion',
  },
  {
    key: 'sepia',
    tab: 'Sepia Tone',
  },
  // Add more tabs as needed
];

const contentList: Record<string, React.ReactNode> = {
  brightness: (
    <div>
      <p>
        Brightness adjustment is a feature that allows you to increase or decrease the brightness of an image.
        {/* Add more detailed explanation here */}
      </p>
      <img src={brightnessImage} alt="Brightness Adjustment" />
    </div>
  ),
  contrast: (
    <div>
      <p>
        Contrast enhancement is a technique used to improve the visual quality of an image by increasing the contrast between different colors or intensities.
        {/* Add more detailed explanation here */}
      </p>
      <img src={contrastImage} alt="Contrast Enhancement" />
    </div>
  ),
  blur: (
    <div>
      <p>
        Blur is a common image processing technique used to reduce detail and noise in images, making them appear smoother.
        {/* Add more detailed explanation here */}
      </p>
      
    </div>
  ),
  sharpen: (
    <div>
      <p>
        Sharpening is an image enhancement technique used to increase the clarity and detail of an image by emphasizing the edges.
        {/* Add more detailed explanation here */}
      </p>
    
    </div>
  ),
  grayscale: (
    <div>
      <p>
        Grayscale conversion is the process of converting a color image into a black and white image, where each pixel's intensity represents its brightness.
        {/* Add more detailed explanation here */}
      </p>
    
    </div>
  ),
  sepia: (
    <div>
      <p>
        Sepia tone is a nostalgic effect that gives photos a warm, brownish tone, reminiscent of old-fashioned photographs.
        {/* Add more detailed explanation here */}
      </p>
     
    </div>
  ),
  // Add more content for additional tabs
};

export const Documentation = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('brightness');

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div className="documentation-container">
      <Card
       bordered
        style={{ width: '100%' }}
        title="Documentation"
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};

export default Documentation;
