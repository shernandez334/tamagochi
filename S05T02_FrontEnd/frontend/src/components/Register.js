import React from "react";
import "../styles/Background.css"; // Ensure this contains the .page-container styles
import "../styles/RegisterForm.css"; // Ensure this contains .RegisterForm styles

const Register = () => {
  return (
    <div className="page-container">
      <div className="page-content RegisterForm">
        <h1>Register</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required />
          </div>
          <button type="submit" className="form-button">Register</button>
        </form>
        <p className="form-footer">
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;