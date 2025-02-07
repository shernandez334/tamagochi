import React from "react";
import "../styles/logo.css"; 
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="CrewPets Logo" className="logo-image" />
      <h1 className="logo-text">CrewPets</h1>
    </div>
  );
};

export default Logo;