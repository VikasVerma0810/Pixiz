
// Navbar.tsx
import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeFilled,
  UserOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export const Navbar = ({
  onImageUpload,
  image,
}: {
  onImageUpload: (image: string) => void;
  image: string;
}) => {
  const [signInVisible, setSignInVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // State to track user login status
  const [userName, setUserName] = useState(""); // State to store user name
  // const navigate = useNavigate();
  // Function to handle user login
  const handleLogin = (username: string) => {
    setUserName(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout actions
    setLoggedIn(false);
    setUserName("");
  };

  const handleSignIn = () => {
    setSignInVisible(true);
  };

  // const handleLoginSuccess = () => {
  //   // Redirect logic after successful login
  //   // For example, redirect to the previous location
  //   navigate(-1);
  // };

  const handleSignUp = () => {
    setSignUpVisible(true);
  };

  const handleSignInClose = () => {
    setSignInVisible(false);
  };

  const handleRedirectToLogin = () => {
    handleSignUpClose(); 
    handleSignIn(); 
  };

  const handleSignUpClose = () => {
    setSignUpVisible(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = URL.createObjectURL(e.target.files[0]);
      onImageUpload(selectedImage);
    }
  };

  const handleDownload = () => {
    if (loggedIn) {
      // If user is logged in, proceed with downloading the image
      const link = document.createElement("a");
      link.href = image;
      link.download = "processed_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      
      handleSignIn();
    }
  };

  return (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#D3D0FF",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Menu.Item
        key="home"
        icon={<HomeFilled />}
        style={{ fontWeight: "normal", fontSize: "14px" }}
      >
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item
        key="documentation"
        style={{ fontWeight: "normal", fontSize: "14px" }}
      >
        <Link to="/documentation">Documentation</Link>
      </Menu.Item>
      <Menu.Item key="upload" icon={<CloudUploadOutlined />}>
        <label htmlFor="navbar-upload-input">
          Upload Image
          <input
            id="navbar-upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
      </Menu.Item>
      <Menu.Item
        key="download"
        icon={<DownloadOutlined />}
        onClick={handleDownload}
      >
        Download
      </Menu.Item>
      <Menu.Item
        key="username"
        style={{ fontWeight: "normal", fontSize: "14px" }}
      >
        {userName}
      </Menu.Item>
      {loggedIn ? (
        <>
          <Menu.Item
            key="logout"
            icon={<UserOutlined />}
            style={{ fontWeight: "normal", fontSize: "14px" }}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item
            key="signin"
            icon={<UserOutlined />}
            style={{ fontWeight: "normal", fontSize: "14px" }}
            onClick={handleSignIn}
          >
            Sign In
          </Menu.Item>
          <Menu.Item
            key="signup"
            icon={<UserOutlined />}
            style={{ fontWeight: "normal", fontSize: "14px" }}
            onClick={handleSignUp}
          >
            Sign Up
          </Menu.Item>
        </>
      )}
      <SignInForm
        visible={signInVisible}
        onClose={handleSignInClose}
        onLogin={handleLogin}
      />
      
      <SignUpForm
        visible={signUpVisible}
        onClose={handleSignUpClose}
        onRedirectToLogin={handleRedirectToLogin}
      />
    </Menu>
  );
};

export default Navbar;
