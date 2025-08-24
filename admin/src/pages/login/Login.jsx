import { useContext, useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(`${BASE_URL}/auth/login`, credentials);

      // Log the response to see what we're getting
      console.log("Login response:", res.data);

      if (res.data.isAdmin) {
        // Make sure there's a token and add it if missing
        const userData = {
          ...res.data,
          token: res.data.token || res.data._id, // Fallback to using _id as token if needed
        };

        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not authorized!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
