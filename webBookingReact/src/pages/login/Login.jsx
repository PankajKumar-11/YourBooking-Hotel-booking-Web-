import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "Login failed" },
      });
    }
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "";
      await axios.post(`${BASE_URL}/auth/register`, credentials);
      alert("Registration successful! You can now login");
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
          <button onClick={handleRegisterClick} className="lButton">
            Register
          </button>
        )}

        {isLogin && error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
