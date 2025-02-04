import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/LoginForm.css";
import "../styles/Logo.css"; 
import logo from "../assets/logo.png";


const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        const decodedToken = jwtDecode(data.token);
        
        const playerId = decodedToken.sub;
        const username = data.username || decodedToken.username || "User";

        localStorage.setItem("playerId", playerId);
        localStorage.setItem("username", username);

        setMessage("Login successful!"); 
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="header-logo">
        <img src={logo} alt="CrewPets Logo" className="header-logo" />
        <div class="logo-text">Crewmates</div>
      </div>
      <div className="page-content">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password"  
                onChange={handleChange}
                required 
              />
            </div>
            <button type="submit" className="auth-button">Login</button>
          </form>
          {message && <p className="form-message">{message}</p>}
          <p className="form-footer">
            Don't have an account? <a href="/register">Register here</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;