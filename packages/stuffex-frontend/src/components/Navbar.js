import React, { useState, useEffect } from 'react'; 
import Logo from '../images/logo.png'
import User from '../images/profile.png'
import { Link } from 'react-router-dom'
import './Navbar.css' // Import the CSS file
import Authentication from '../authentication/Authentication'

const Navbar = (props) => {
  const restoreItems = () => {
    props.updateItems()
  }

  // const id = Authentication.getCurrentUser()._id
  const [isLoggedIn, setIsLoggedIn] = useState(Authentication.isLoggedIn());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(Authentication.isLoggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <nav className="navbar-style">
      <div className="navbar-content-style">
        <Link to="/" onClick={restoreItems}>
          <img src={Logo} alt="Logo" className="logo-image" />
        </Link>
        <div className="nav-links">
          <Link to="/About" className="nav-link">
            About
          </Link>
          <Link to="/Form" className="nav-link">
            List an Item
          </Link>
          {isLoggedIn ? (
            <Link to={`/Test`}>
              <img src={User} alt="User" className="user-image" />
            </Link>
          ) : (
            <Link to="/login">
              <img src={User} alt="User" className="user-image" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
