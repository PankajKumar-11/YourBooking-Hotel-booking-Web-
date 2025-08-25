import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("register") === "true") {
      setIsLogin(false);
    }
  }, [location]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      // Add success toast
      toast.success("Login successful! Welcome back.", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "Login failed" },
      });

      // Add error toast
      toast.error(
        err.response?.data?.message || "Login failed. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  };

  // Update the handleRegister function
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs before sending
    if (!credentials.username || !credentials.email || !credentials.password) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    if (!credentials.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // Password length check
    if (credentials.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "";

      // Add better error logging
      console.log("Sending registration with:", credentials);

      // Make sure we send proper headers
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response.data);
      // Add success toast
      toast.success("Registration successful! You can now login", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsLogin(true); // Switch to login tab
    } catch (err) {
      console.error("Registration error details:", err.response?.data);
      // Add error toast
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <h1>{isLogin ? "Sign In" : "Create Account"}</h1>

        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />

        {isLogin ? (
          <button
            disabled={loading}
            onClick={handleLoginClick}
            className="lButton"
          >
            Login
          </button>
        ) : (
          <button onClick={handleRegister} className="lButton">
            Register
          </button>
        )}

        {isLogin && error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
