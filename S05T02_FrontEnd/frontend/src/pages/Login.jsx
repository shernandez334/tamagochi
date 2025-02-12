import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Login = () => {
  console.log("Rendering Login.jsx");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token); // ✅ Store token (if applicable)
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000); // ✅ Redirect after login
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="Login"
        inputs={[
          {
            label: "Username",
            type: "text",
            placeholder: "Enter your username",
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
        ]}
        buttonText="Login"
        onSubmit={handleSubmit}
        error={message}
        message={
          <span>
            Don't have an account? <Link to="/register">Register here</Link>
          </span>
        }
      />
    </AuthLayout>
  );
};

export default Login;