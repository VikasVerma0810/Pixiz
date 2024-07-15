
import { ConfigProvider } from 'antd';
import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import Documentation from './pages/Documentation';


function App() {
  const [image, setImage] = useState<string>('');
  const [imageOriginal, setImageOriginal] = useState<string>('');

  const handleImageUpload = (selectedImage: string) => {
    setImage(selectedImage);
    setImageOriginal(selectedImage);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <Router>
        <Navbar onImageUpload={handleImageUpload} image={image} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home image={image} setImage={setImage} imageOriginal={imageOriginal} setImageOriginal={setImageOriginal} />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

