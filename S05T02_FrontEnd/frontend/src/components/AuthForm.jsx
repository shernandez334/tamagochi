import React from "react";
import "../styles/form.css";

const AuthForm = ({ title, inputs, buttonText, message, error, onSubmit }) => {
  return (
    <div className="auth-box">
      <h2>{title}</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={onSubmit}>
        {inputs.map((input, index) => (
          <div key={index} className="form-group">
            <label>{input.label}</label>
            <input 
              name={input.name}
              type={input.type} 
              placeholder={input.placeholder} 
              value={input.value}  
              onChange={input.onChange}
              required
            />
          </div>
        ))}
        <button type="submit">{buttonText}</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default AuthForm;
