import React from "react";
import "../styles/authBackground.css"; 
import Logo from "../components/AuthLogo.jsx";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-content"> 
        <Logo /> 
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;