import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homeBackground.css"; 
import Logo from "../components/Logo.jsx";

const generateStars = (num) => {
  let stars = [];
  for (let i = 0; i < num; i++) {
    const starStyle = {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 6}s`, 
    };
    stars.push(<div key={i} className="star" style={starStyle}></div>);
  }
  return stars;
};

const HomeLayout = ({ children }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("authToken"); 
      navigate("/login"); 
    };
  
    return (
      <div className="nebula-bg">
        <div className="stars">{generateStars(600)}</div> 
  
        <div className="home-navbar">
          <Logo /> 
          <button className="logout-button" onClick={handleLogout}>Logout</button> 
        </div>
  
        {children} 
      </div>
    );
  };

export default HomeLayout;