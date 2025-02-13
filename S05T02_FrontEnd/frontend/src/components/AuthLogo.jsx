import React from "react";
import "../styles/authLogo.css"; 
import logo from "../assets/logo.png";

const AuthLogo = () => {
  return (
    <div className="auth-header-logo">
      <img src={logo} alt="CrewPets Logo" className="auth-logo-image" />
      <h1 className="auth-logo-title">CrewPets</h1>
    </div>
  );
};

export default AuthLogo;