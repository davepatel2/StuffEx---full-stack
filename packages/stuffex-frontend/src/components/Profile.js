// Importing necessary React hooks and CSS for the form
import React, { useState } from 'react'
import './form.css'
import { Link } from 'react-router-dom'

// Functional component Form with props passed from parent component
function Profile(props) {
  // State for managing form data
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  })

  // State for managing form validation errors
  const [errors, setErrors] = useState({})
  const [isTyping, setIsTyping] = useState({
    username: false,
    password: false,
    email: false,
    phone: false,
  })
  // Function to validate profile data
  function validateProf() {
    const newErrors = {}
    // Check if username is empty and add to errors if so
    if (!user.username.trim()) {
      newErrors.username = true
    }

    // Similarly check if password is empty
    if (!user.email.trim()) {
      newErrors.email = true
    }

    // Similarly check if password is empty
    if (!user.password.trim()) {
      newErrors.password = true
    }

    return newErrors
  }

  // Function to create profile
  function createProf() {
    const profErrors = validateProf()
    // If no errors, submit the form and reset the state
    if (Object.keys(profErrors).length === 0) {
      console.log(user)
      props.handleProfile(user)
      setUser({ username: '', email: '', phone: '', password: '' })
    }

    setErrors(profErrors)
  }

  // Function to handle changes in profile inputs
  function handleChange(event) {
    const { name, value } = event.target
    // Update form data state
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }))
    }

    setIsTyping((prevIsTyping) => ({
      ...prevIsTyping,
      [name]: value.length > 0,
    }))
  }

  // Render the form with input fields and handling errors
  return (
    <form>
      <input
        type="credentials"
        name="username"
        id="username"
        value={user.username}
        onChange={handleChange}
        placeholder={isTyping.username ? '' : 'Enter Username'}
        className={errors.username ? 'input-error' : ''}
      />

      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={handleChange}
        placeholder={isTyping.password ? '' : 'Enter Password'}
        className={errors.password ? 'input-error' : ''}
      />

      <input
        type="credentials"
        name="email"
        id="email"
        value={user.email}
        onChange={handleChange}
        placeholder={isTyping.email ? '' : 'Email'}
        className={errors.email ? 'input-error' : ''}
      />

      <input
        type="credentials"
        name="phone"
        id="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder={isTyping.phone ? '' : 'Phone'}
        className={errors.phone ? 'input-error' : ''}
      />

      <input type="button" value="Create Profile" onClick={createProf} />
      <Link to="/login" className="back-button">
        &#60;- Back{' '}
      </Link>
    </form>
  )
}

export default Profile
