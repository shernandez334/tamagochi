import React from "react";
import "../styles/homeLogo.css"; 
import logo from "../assets/logo.png";

const HomeLogo = () => {
  return (
    <div className="home-logo-container">
      <img src={logo} alt="CrewPets Logo" className="home-logo-image" />
      <h1 className="home-logo-text">CrewPets</h1>
    </div>
  );
};

export default HomeLogo;