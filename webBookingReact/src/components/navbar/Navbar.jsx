import React, { useContext } from 'react'
import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

// Keep the helper functions as is
export const getAvatarColor = (username) => {
  try {
    if (!username) return "#0071c2";
    const colors = ["#0071c2", "#FF5733", "#8A2BE2", "#228B22", "#D2691E", "#4B0082"];
    const sum = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  } catch (error) {
    return "#0071c2"; 
  }
};

export const getInitial = (username) => {
  try {
    return username && typeof username === 'string' ? username.charAt(0).toUpperCase() : "G";
  } catch (error) {
    return "G"; 
  }
};

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className='navbar'>
      <div className="navContainer">
        <div className="leftSection">
          <Link to="/" className="logo">
            YourBooking
          </Link>
        </div>
        
        <div className="centerSection">
          <div className="navItem active">
            <span>Stays</span>
          </div>
          <div className="navItem">
            <span>Flights</span>
          </div>
          <div className="navItem">
            <span>Car Rentals</span>
          </div>
        </div>
        
        <div className="rightSection">
          {user ? (
            <div className="userControls">
              <div 
                className="userAvatar" 
                style={{backgroundColor: user && user.username ? getAvatarColor(user.username) : "#0071c2"}}
              >
                {user && user.username ? getInitial(user.username) : "G"}
              </div>
              <span className="username">{user?.username || "Guest"}</span>
              <button className="logoutBtn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="authButtons">
              <button className="navButton" onClick={() => navigate("/login?register=true")}>
                Register
              </button>
              <button className="navButton" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
