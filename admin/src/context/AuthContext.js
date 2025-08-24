import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: true,
        error: null,
      };

      case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

      case "LOGIN_FAILURE":
      return {
        user: null,
        loading: true,
        error: action.payload,
      };

      case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
      default:
      return state;
  }
};

export const login = async (credentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const BASE_URL = import.meta.env.VITE_API_URL || "";
    const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
    
    // Log the response to see its structure
    console.log("Login response:", res.data);
    
    // Add token explicitly if it's missing
    const userData = {
      ...res.data,
      token: res.data.token || res.data.accessToken || res.data._id // Try different possible token field names
    };
    
    if (userData.isAdmin) {
      // Save to localStorage with token explicitly included
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    } else {
      dispatch({ 
        type: "LOGIN_FAILURE", 
        payload: { message: "You are not authorized!" } 
      });
    }
  } catch (err) {
    dispatch({ 
      type: "LOGIN_FAILURE", 
      payload: err.response?.data || { message: "Login failed" }
    });
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user))
  },[state.user])

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      },
    },
    children
  );
};
