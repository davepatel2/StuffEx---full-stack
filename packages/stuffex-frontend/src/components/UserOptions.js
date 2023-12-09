// About.js
import React, { useEffect } from 'react'
import './About.css' // Import the CSS file
import Authentication from '../authentication/Authentication'
import { useNavigate } from 'react-router-dom'

const UserOptions = () => {
  const nav = useNavigate() // Get the history object

  // If the current user is not logged in, redirect them to login
  useEffect(() => {
    if (!Authentication.isLoggedIn()) {
      nav('/login')
    }
  })

  const redirectToProfile = () => {
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
      <input type="button" data-cy="profile-option" value="Go to Profile" onClick={redirectToProfile} />
      <hr />
      <input type="button" data-cy="logout-option" value="Log Out" onClick={handleLogout} />
    </form>
  )
}

export default UserOptions
