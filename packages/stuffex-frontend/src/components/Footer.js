import React from 'react'
import './Footer.css' // Import your CSS file for styling
import Shape from '../images/footer.png'
function Footer() {
  return (
    <footer className="footer-container">
      <img src={Shape} alt="Shape" className="footer-image" />
      <div className="footer-content">
        <p>&copy; 2023 StuffEX. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
