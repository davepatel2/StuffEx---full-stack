import { backendRoot } from '../AppConfig'

const getSessionToken = () => localStorage.getItem('token')

const setSessionToken = (token) => localStorage.setItem('token', token)

function isLoggedIn() {
  return getSessionToken() !== null
}

function login(userCredentials) {
  const endpoint = `${backendRoot}/login`

  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then((data) => data.token)
      .then((token) => {
        setSessionToken(token)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const exports = {
  login,
  isLoggedIn,
}

export default exports
