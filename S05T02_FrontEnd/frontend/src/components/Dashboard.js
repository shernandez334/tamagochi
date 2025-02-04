import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; 

const Dashboard = () => {
  const [playerId, setPlayerId] = useState("");
  const [username, setUsername] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedPlayerId = localStorage.getItem("playerId");
    const storedUsername = localStorage.getItem("username"); 


    if (storedPlayerId) {
      setPlayerId(storedPlayerId);
      setUsername(storedUsername || "User"); 
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("playerId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="neon-glow"></div>

      <div className="dashboard-header">
        Welcome, {username}!
      </div>
      <div className="dashboard-content">
        <button onClick={handleLogout} className="form-button">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;