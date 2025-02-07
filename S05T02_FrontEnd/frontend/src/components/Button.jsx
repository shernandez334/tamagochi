import React from "react";
import "../styles/button.css"; 

const Button = ({ text, onClick, type = "primary" }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;