import { useRef } from 'react'
import { backendRoot } from './AppConfig'

function Register() {
  const usernameInput = useRef(null)
  const passwordInput = useRef(null)
  const confirmPasswordInput = useRef(null)

  async function register() {
    try {
      const authenticationObject = await validateInput()
      console.log(backendRoot, authenticationObject)
    } catch (e) {
      alert(e)
    }
  }

  async function validateInput() {
    /* Username availability check */
    const username = usernameInput.current.value

    /* Passwords matching check */
    const password = passwordInput.current.value
    const confirmed = confirmPasswordInput.current.value
    if (password !== confirmed) {
      throw new Error('Passwords do not match. Please try again.')
    }

    const hashed = password
    return { username: username, password: hashed }
  }

  return (
    <div>
      <h2>Register</h2>
      <h4>Username</h4>
      <input type="text" ref={usernameInput} placeholder="Username" />
      <h4>Password</h4>
      <input type="password" ref={passwordInput} placeholder="Password" />
      <br />
      <input
        type="password"
        ref={confirmPasswordInput}
        placeholder="Confirm Password"
      />

      <br />
      <button onClick={register}>Register</button>
    </div>
  )
}

export default Register
