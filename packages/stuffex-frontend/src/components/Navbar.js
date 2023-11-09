import React from 'react'
import Logo from '../images/logo.png'

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
        <a href="/">
          <img src={Logo} alt="Logo" style={{ height: 60 }} />
        </a>
        <a href="/about">About</a>
        <a href="/Form">List an Item</a>
      </div>
    </nav>
  )
}

export default Navbar
