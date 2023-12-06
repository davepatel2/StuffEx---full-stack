// Importing necessary React hooks and CSS for the form
import React, { useState } from 'react'
import './form.css'

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

  // Function to validate profile data
  function validateProf() {
    const newErrors = {}
    // Check if username is empty and add to errors if so
    if (!user.username.trim()) {
      newErrors.username = true
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
  }

  // Render the form with input fields and handling errors
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={handleChange}
        className={errors.username ? 'input-error' : ''}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={user.email}
        onChange={handleChange}
        className={errors.email ? 'input-error' : ''}
      />

      <label htmlFor="phone">Phone Number</label>
      <input
        type="text"
        name="phone"
        id="phone"
        value={user.phone}
        onChange={handleChange}
        className={errors.phone ? 'input-error' : ''}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={handleChange}
        className={errors.password ? 'input-error' : ''}
      />

      <input type="button" value="Create Profile" onClick={createProf} />
    </form>
  )
}

export default Profile
