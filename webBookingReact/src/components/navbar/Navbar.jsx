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
      <div className="nav-Container">
        <Link to="/" className="logo">
          YourBooking
        </Link>
        
       
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
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
