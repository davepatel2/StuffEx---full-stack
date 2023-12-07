// About.js
import React from 'react'
import './About.css' // Import the CSS file
import Authentication from '../authentication/Authentication'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const nav = useNavigate() // Get the history object

  const handleLogout = () => {
    Authentication.logout()
    nav('/login')
  }

    return (
      <form>
        <input type="button" value="Log Out" onClick={handleLogout}/>
      </form>
    )
  }


export default Test
