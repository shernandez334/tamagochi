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
  const [loading, setLoading] = useState(false); // ✅ Prevents multiple clicks

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); // ✅ Disable button while logging in

    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required.");
      setLoading(false);
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

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Invalid username or password.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("🔑 Login Response:", data); 

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);

      setMessage("✅ Login successful! Redirecting...");
      
      setTimeout(() => navigate("/home"), 1000); 
    } catch (error) {
      console.error("🚨 Login Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
        buttonText={loading ? "Logging in..." : "Login"} // ✅ Dynamic button text
        buttonDisabled={loading} // ✅ Disables button during request
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