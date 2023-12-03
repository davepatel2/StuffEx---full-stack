import React, { useState } from 'react'
import './form.css'
import Authentication from '../authentication/Authentication'

function Login() {
  // State for managing form data
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  })

  // Update user object
  function handleChange(event) {
    const { name, value } = event.target

    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function callLogin() {
    Authentication.login(userCredentials)
      .then(() => console.log('Successfully logged in'))
      .catch((error) => console.log(error))
  }

  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={userCredentials.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={userCredentials.password}
        onChange={handleChange}
      />

      <input type="button" value="Log In" onClick={callLogin} />
    </form>
  )
}

export default Login
