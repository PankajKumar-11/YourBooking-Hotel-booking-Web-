import React, { useContext, useState } from 'react'
import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

// Move avatar color function outside component so it's accessible globally
export const getAvatarColor = (username) => {
  try {
    if (!username) return "#0071c2";
    const colors = ["#0071c2", "#FF5733", "#8A2BE2", "#228B22", "#D2691E", "#4B0082"];
    const sum = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  } catch (error) {
    console.error("Error generating avatar color:", error);
    return "#0071c2"; // Default color if there's an error
  }
};

// Get first letter of username for avatar
export const getInitial = (username) => {
  try {
    return username && typeof username === 'string' ? username.charAt(0).toUpperCase() : "G";
  } catch (error) {
    console.error("Error getting initial:", error);
    return "G"; // Default initial if there's an error
  }
};

const Navbar = () => {
  
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('');

    const handleLogout = () => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    };
  

  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" className="logo">
          YourBooking
        </Link>
        <div className="navItems">
          <div className={`navItem ${activeNav === 'stays' ? 'active' : ''}`} onClick={() => setActiveNav('stays')}>
            <span>Stays</span>
          </div>
          <div className={`navItem ${activeNav === 'flights' ? 'active' : ''}`} onClick={() => setActiveNav('flights')}>
            <span>Flights</span>
          </div>
          <div className={`navItem ${activeNav === 'cars' ? 'active' : ''}`} onClick={() => setActiveNav('cars')}>
            <span>Car Rentals</span>
          </div>
        </div>
        {user ? (
          <div className="userControls">
            <div className="userInfo">
              <div 
                className="userAvatar" 
                style={{backgroundColor: user && user.username ? getAvatarColor(user.username) : "#0071c2"}}
              >
                {user && user.username ? getInitial(user.username) : "G"}
              </div>
              <span className="username">{user?.username || "Guest"}</span>
            </div>
            <button className="logoutBtn" onClick={handleLogout}>
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
