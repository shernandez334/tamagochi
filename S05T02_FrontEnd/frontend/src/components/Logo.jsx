import React from "react";
import "../styles/logo.css"; 
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="auth-header">
      <img src={logo} alt="CrewPets Logo" className="auth-logo" />
      <h1 className="auth-title">CrewPets</h1>
    </div>
  );
};

export default Logo;