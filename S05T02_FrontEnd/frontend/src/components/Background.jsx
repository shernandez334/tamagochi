import React from "react";
import "../styles/background.css"; 

const Background = ({ children }) => {
  return <div className="auth-container">{children}</div>;
};

export default Background;