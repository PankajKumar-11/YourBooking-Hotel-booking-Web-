import React, { useContext } from 'react'
import './Navbar.css'
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  
    const {user } = useContext(AuthContext);
  

  return (
    <div className='navbar'>
      <div className="nav-Container">
        <Link to="/" style={{color:'inherit' , textDecoration:"none"}}>
        <div className="logo">
            <span>Your Booking</span>
        </div>
        </Link>
        {user ? user.username :  <div className="nav-items">
            <button className='navButton'>Register</button>
            <button className='navButton'>Login</button>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
