import React from 'react';
import Logo from '../images/logo.png';
import User from '../images/profile.png';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = (props) => {
  const restoreItems = () => {
    props.updateItems();
  };

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
          <Link to="/Profile">
            <img src={User} alt="User" className="user-image" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
