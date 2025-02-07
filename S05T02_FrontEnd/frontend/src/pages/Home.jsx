import React from "react";
import "../styles/homeBackground.css"; 

const generateStars = (num) => {
  let stars = [];
  for (let i = 0; i < num; i++) {
    const starStyle = {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 6}s`, // ✅ Keeps stars flickering randomly
    };
    stars.push(<div key={i} className="star" style={starStyle}></div>);
  }
  return stars;
};

const Home = () => {
  return (
    <div className="nebula-bg">
      <div className="stars">{generateStars(600)}</div> {/* ✅ Even more stars! */}
      <h1 className="home-title">Welcome to the Galaxy</h1>
    </div>
  );
};

export default Home;
