import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = process.env.TOKEN_SECRET
if (TOKEN_SECRET === undefined) {
  throw new Error('TOKEN_SECRET not set.')
}

const saltRounds = 10
const tokenExpiration = '1d'

/**
 *
 * @param {string} rawPassword an unhashed password string
 */
async function hashPassword(rawPassword) {
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(rawPassword, salt)
}

/** Returns a JWT with a username and userId in the payload. */
function generateAccessToken(username, userId) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        username: username,
        userId: userId,
      },
      TOKEN_SECRET,
      { expiresIn: tokenExpiration },
      (error, token) => {
        if (error) {
          reject(error)
        } else {
          resolve(token)
        }
      }
    )
  })
}

/**
 * @param {*} req an express request object
 * @param {*} res an express response object
 * @returns an object with a username key and userId for the requester
 */
function extractToken(req, res) {
  const authHeader = req.headers['Authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    console.log('No token provided')
    res.status(401).end()
    return undefined
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        return decoded
      } else {
        console.log(`JWT Error: ${error}`)
        res.status(401).end()
        return undefined
      }
    })
  }
}

function loginUser(req, res, user) {
  const { username, password } = req.body

  bcrypt.compare(password, user.hashed_password).then((matched) => {
    if (matched) {
      generateAccessToken(username, user._id).then((token) =>
        res.status(200).send({ token: token, userId: user._id })
      )
    } else {
      // Invalid password
      res.status(401).end()
    }
  })
}

/**
 * Verifies that the request has a valid `authorization` JWT with access to the
 * targetUserId's data. On success, the promise resolves with no data. On
 * failure, the promise rejects with an object containing a `statusCode` field
 * and a `message` field.
 */
function authenticateUser(req, targetUserId) {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      reject({ statusCode: 401, message: 'No "authorization" header provided' })
    }

    const [authType, token] = authHeader && authHeader.split(' ')

    if (authType !== 'Token') {
      reject({
        statusCode: 401,
        message: `Unrecognized authorization type "${authType}"`,
      })
    } else {
      jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
        if (decoded) {
          const { userId } = decoded
          if (targetUserId === userId) {
            resolve()
          } else {
            reject({
              statusCode: 403,
              message: `Token is not authorized for userId ${targetUserId}`,
            })
          }
        } else {
          reject({ statusCode: 403, message: error.message })
        }
      })
    }
  })
}

export default {
  hashPassword,
  generateAccessToken,
  extractToken,
  loginUser,
  authenticateUser,
}
