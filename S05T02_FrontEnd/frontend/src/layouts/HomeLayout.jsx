import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homeBackground.css"; 
import SmallLogo from "../components/HomeLogo.jsx"; 

const generateStars = (num) => {
  let stars = [];
  for (let i = 0; i < num; i++) {
    const starStyle = {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      animation: `twinkle ${2 + Math.random() * 3}s infinite alternate ease-in-out`, 
    };
    stars.push(<div key={i} className="star" style={starStyle}></div>);
  }
  return stars;
};

const HomeLayout = ({ children }) => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch("/pets") 
            .then((response) => response.json())
            .then((data) => setPets(data))
            .catch((error) => console.error("Error fetching pets:", error));
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("authToken"); 
      navigate("/login"); 
    };

    return (
        <div className="home-container"> {/* Use homeBackground styling */}
          <div className="stars">{generateStars(600)}</div> 
    
          {/* Navbar with small glowing logo */}
          <div className="home-navbar">
            <div className="navbar-content">
              <SmallLogo />
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="pets-container">
            <h2 className="pets-title">Your Pets</h2>
            <div className="pets-list">
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <div key={pet.id} className="pet-card">
                    <h3>{pet.name}</h3>
                    <p>Breed: {pet.breed}</p>
                    <p>Age: {pet.age} years</p>
                  </div>
                ))
              ) : (
                <p>No pets found.</p>
              )}
            </div>
          </div>

          {children} 
        </div>
      );
};

export default HomeLayout;
