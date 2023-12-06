import { backendRoot } from '../AppConfig'

const getSessionToken = () => localStorage.getItem('token')
const getSessionUserId = () => localStorage.getItem('userId')

const setSessionToken = (token) => localStorage.setItem('token', token)
const setSessionUserId = (userId) => localStorage.setItem('userId', userId)

/**
 * @returns \{ token: sessionToken, userId: sessionUserId \}
 */
function getSessionCredentials() {
  return {
    token: getSessionToken(),
    userId: getSessionUserId(),
  }
}

/**
 * @returns true if the user is logged in, false otherwise
 */
function isLoggedIn() {
  return getSessionToken() && getSessionUserId()
}

/**
 *
 * @param {object} userCredentials `username` and `password` fields.
 * @returns A promise that resolves on successful login
 */
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

/**
 * @returns A promise that resolves with a user object for the current user.
 */
const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    if (!isLoggedIn()) {
      reject('User is not logged in.')
      return
    }

    const endpoint = `${backendRoot}/users/${getSessionUserId()}`
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        resolve(data)
      })
      .catch((e) => reject(e))
  })

const exports = {
  login,
  isLoggedIn,
  getSessionCredentials,
  getCurrentUser,
}

export default exports
