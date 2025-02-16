import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homeBackground.css"; 
import SmallLogo from "../components/HomeLogo.jsx";
import PetList from "../components/PetList.jsx"; 

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
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        if (!storedToken) {
            console.warn("⚠️ No token found. Redirecting to login.");
            navigate("/login");
            return;
        }

        setToken(storedToken);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="home-container"> 
            <div className="stars">{generateStars(600)}</div> 

            {/* ✅ Navbar with Logo & Logout */}
            <div className="home-navbar">
                <div className="navbar-content">
                    <SmallLogo />
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            {/* ✅ Integrating the PetList component */}
            <PetList token={token} />

            {children}
        </div>
    );
};

export default HomeLayout;
