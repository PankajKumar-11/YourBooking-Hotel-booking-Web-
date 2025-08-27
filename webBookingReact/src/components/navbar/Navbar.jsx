import React, { useContext } from 'react'
import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
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
        <Link to="/" className="logo">
          YourBooking
        </Link>
        {user ? (
          <div className="userControls">
            <div className="userInfo">
              <div 
                className="userAvatar" 
                style={{backgroundColor: getAvatarColor(user.username)}}
              >
                {getInitial(user.username)}
              </div>
              <span className="username">{user.username}</span>
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
