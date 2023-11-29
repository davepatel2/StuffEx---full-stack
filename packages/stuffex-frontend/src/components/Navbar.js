import React from 'react'
import Logo from '../images/logo.png'
import User from '../images/profile.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const navbarStyle = {
    borderBottom: '2px solid #149562',
  }

  const navbarContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <nav style={navbarStyle}>
      <div style={navbarContentStyle}>
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ height: 60 }} />
        </Link>
        <Link to="/About">About</Link>
        <Link to="/Form">List an Item</Link>
        <Link to="/Profile">
          <img src={User} alt="User" style={{ height: 50 }} />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
