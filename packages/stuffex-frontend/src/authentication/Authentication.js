import { backendRoot } from '../AppConfig'

const getSessionToken = () => localStorage.getItem('token')
const getSessionUserId = () => localStorage.getItem('userId')
const getSessionUsername = () => localStorage.getItem('username')

const setSessionToken = (token) => localStorage.setItem('token', token)
const setSessionUserId = (userId) => localStorage.setItem('userId', userId)
const setSessionUsername = (username) =>
  localStorage.setItem('username', username)

/**
 * @returns \{ token: sessionToken, userId: sessionUserId \}
 */
function getSessionCredentials() {
  return {
    token: getSessionToken(),
    userId: getSessionUserId(),
    username: getSessionUsername(),
  }
}

/**
 * @returns true if the user is logged in, false otherwise
 */
function isLoggedIn() {
  return getSessionToken() && getSessionUserId() && getSessionUsername()
}

/**
 *
 * @param {object} userCredentials `username` and `password` fields.
 * @returns A promise that resolves on successful login
 */
function login(userCredentials) {
  const endpoint = `${backendRoot}/login`
  const { username } = userCredentials

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
        setSessionUsername(username)

        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
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
  logout,
  isLoggedIn,
  getSessionCredentials,
  getCurrentUser,
}

export default exports
