import { useAuth } from "../context/AuthContext";
import { createUser } from "../lib/api";
import { validateName, validateEmail } from "../lib/utils";
import React, { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: null, email: null });

  const authCtx = useAuth();

  const handleInputChange = (e) => {
    if (e.target.name === "email" && validateEmail(e.target.value)) {
      setErrors((prev) => {
        return { ...prev, email: null };
      });
    }
    if (e.target.name === "name" && validateName(e.target.value)) {
      setErrors((prev) => {
        return { ...prev, name: null };
      });
    }

    setUserData((prevUserData) => {
      const newUserData = { ...prevUserData, [e.target.name]: e.target.value };
      return newUserData;
    });
  };

  const loginHandler = () => {
    const isValidName = validateName(userData.name);
    const isValidEmail = validateEmail(userData.email);
    if (!isValidName) {
      setErrors((prev) => {
        return { ...prev, name: "Name should be more than 2 characters" };
      });
      return;
    }

    if (!isValidEmail) {
      setErrors((prev) => {
        return { ...prev, email: "Please enter a valid email" };
      });
      return;
    }
    createUser(userData);
    authCtx.login(userData);
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your name"
            className="input"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter your Email"
            className="input"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <button className="btn login-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
