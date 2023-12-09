import React, { useState } from 'react'
import './form.css'
import Authentication from '../authentication/Authentication'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
  const nav = useNavigate()

  // State for managing form data and tracking typing status
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  })

  const [isTyping, setIsTyping] = useState({
    username: false,
    password: false,
  })

  // Update user object and set typing status
  function handleChange(event) {
    const { name, value } = event.target

    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    setIsTyping((prevIsTyping) => ({
      ...prevIsTyping,
      [name]: value.length > 0,
    }))
  }

  function callLogin() {
    Authentication.login(userCredentials)
      .then(() => {
        console.log('Successfully logged in')
        nav('/')
      })
      .catch((error) => console.log(error))
  }

  return (
    <form>
      <input
        type="credentials"
        name="username"
        value={userCredentials.username}
        onChange={handleChange}
        placeholder={isTyping.username ? '' : 'Username'}
      />

      <input
        type="password"
        name="password"
        value={userCredentials.password}
        onChange={handleChange}
        placeholder={isTyping.password ? '' : 'Password'}
      />
      <input
        type="button"
        data-cy="login-button"
        value="Log In"
        onClick={callLogin}
      />
      <p className="create-account-text">
        New User?{' '}
        <Link to="/Profile" className="create-account-link">
          Create Account
        </Link>
      </p>
    </form>
  )
}

export default Login
