import { backendRoot } from '../AppConfig'

const getSessionToken = () => localStorage.getItem('token')
const getSessionUserId = () => localStorage.getItem('userId')

const setSessionToken = (token) => localStorage.setItem('token', token)
const setSessionUserId = (userId) => localStorage.setItem('userId', userId)

function getSessionCredentials() {
  return {
    token: getSessionToken(),
    userId: getSessionUserId(),
  }
}

function isLoggedIn() {
  return getSessionToken() && getSessionUserId()
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
      .then((data) => {
        const { token, userId } = data
        setSessionToken(token)
        setSessionUserId(userId)

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
  getSessionCredentials,
}

export default exports
