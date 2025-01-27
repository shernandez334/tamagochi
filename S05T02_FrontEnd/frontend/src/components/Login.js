import React from "react";
import "../styles/Background.css"; 
import "../styles/LoginForm.css"; 

const Login = () => {
  return (
    <div className="page-container">
      <div className="page-content login-form">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"  required />
          </div>
          <button type="submit" className="form-button">Login</button>
        </form>
        <p className="form-footer">
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;