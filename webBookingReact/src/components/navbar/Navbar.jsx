import React, { useContext } from 'react'
import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

// Keep helper functions
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
        {/* Logo aligned with navigation */}
        <Link to="/" className="logo">
          YourBooking
        </Link>
        
        {/* Navigation items */}
        <div className="navLinks">
          <div className="navLink active">
            <span className="navIcon">🛏️</span>
            <span>Stays</span>
          </div>
          <div className="navLink">
            <span className="navIcon">✈️</span>
            <span>Flights</span>
          </div>
          <div className="navLink">
            <span className="navIcon">🚗</span>
            <span>Car Rentals</span>
          </div>
          <div className="navLink">
            <span className="navIcon">🏛️</span>
            <span>Attractions</span>
          </div>
          <div className="navLink">
            <span className="navIcon">🚕</span>
            <span>Airport Taxis</span>
          </div>
        </div>
        
        {/* User controls */}
        {user ? (
          <div className="navItems">
            <span className="username">{user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
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
  )
}

export default Navbar
