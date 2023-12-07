// About.js
import React from 'react'
import './About.css' // Import the CSS file
import Authentication from '../authentication/Authentication'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const nav = useNavigate() // Get the history object

  const redirect = () => {
    const { userId } = Authentication.getSessionCredentials()
    const navString = '/users/' + userId
    nav(navString)
  }

  const handleLogout = () => {
    Authentication.logout()
    nav('/login')
  }

  return (
    <form>
      <input type="button" value="Go to Profile" onClick={redirect} />
      <hr />
      <input type="button" value="Log Out" onClick={handleLogout} />
    </form>
  )
}

export default Test
