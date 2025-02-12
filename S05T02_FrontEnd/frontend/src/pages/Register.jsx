import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value, 
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
  
    const { username, password, confirmPassword } = formData; // ✅ Always use destructured values
  
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage("All fields are required.");
      return;
    }
  
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          confirmPassword: confirmPassword.trim(),
        }),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Register"
        inputs={[
          {
            label: "Username",
            type: "text",
            placeholder: "Choose a username",
            name: "username",
            value: formData.username,
            onChange: handleChange, 
          },
          {
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            name: "password",
            value: formData.password,
            onChange: handleChange, 
          },
          {
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm your password",
            name: "confirmPassword",
            value: formData.confirmPassword,
            onChange: handleChange, 
          },
        ]}
        buttonText="Register"
        onSubmit={handleSubmit}
        error={message} 
        message={
          <span>
            Already have an account? <Link to="/login">Login here</Link>
          </span>
        }
      />
    </AuthLayout>
  );
};

export default Register;