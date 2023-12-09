// About.js
import React from 'react'
import './About.css' // Import the CSS file
import aboutImage from '../images/decal.png'
const About = () => {
  return (
    <div className="about-style">
      <img src={aboutImage} alt="About StuffEX" className="about-image" />
      <h2>About StuffEx</h2>
      <p>
        StuffEX is a website for individuals who want to find and get rid of any
        item. It allows people to post items they don't want anymore so others
        can give them a new home. Our website is strictly for free items. We
        aren't connecting sellers to buyers but{' '}
        <strong>people to people</strong>.
      </p>
    </div>
  )
}

export default About
