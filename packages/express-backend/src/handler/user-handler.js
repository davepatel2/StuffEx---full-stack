const users = [
  {
    id: '18',
    username: 'manningpate',
    email: 'peytonmanning@example.com',
    items: ['1999', '1238'],
  },
  {
    id: '13',
    username: 'brock',
    email: 'brock@example.com',
    phone: '1235551234',
    items: [],
  },
  {
    id: '12',
    username: 'tombrady',
    email: 'brady@example.com',
    items: ['4002', '1012', '9013'],
  },
  {
    id: '3',
    username: 'russ',
    phone: '1235552930',
    items: [],
  },
  {
    id: '11',
    username: 'joshua.smith',
    email: 'joshua@example.com',
    items: ['3141'],
  },
]

/** Return true if the username is taken, false otherwise. */
const usernameIsUnique = (username) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) return false
  }

  return true
}

/** Return a random hex string */
const randomHexString = () => Math.round(Math.random() * (1 << 16)).toString(16)

/** Return a user id string */
const userIdGenerator = () => `${randomHexString()}-${randomHexString()}`

/**
 * This is the main handler. At the moment, it uses a JavaScript object to
 * keep track of state. In the next sprints, it will connect to MongoDB.
 */
class UserHandler {
  constructor() {}

  /** Return a list of all users. */
  getUsers() {
    return users
  }

  /** Get a user that matches the given id. */
  getUserById(userId) {
    const user = users.find((user) => user.id === userId)
    return user
  }

  /**
   * Add a user object to the data. Each user object must have the
   * following fields:
   * username: string representing a username
   * email: optional string representing an email address
   * phone: optional string representing a phone number
   * items: optional array representing id's of items owned by the user
   *
   * Returns the object of the created user on success. Returns undefined on
   * failure.
   */
  createUser(user) {
    if (
      Object.keys(user).includes('id') ||
      !Object.keys(user).includes('username') ||
      !usernameIsUnique(user.username)
    ) {
      return undefined
    }

    user.id = userIdGenerator()

    users.push(user)

    return user
  }

  /**
   * Delete the user with the given id.
   */
  deleteUser(userId) {
    const deleteIndex = users.findIndex((user) => user.id === userId)

    if (deleteIndex === -1) {
      // User does not exist, just return
      return
    }

    users.splice(deleteIndex, 1)
  }
}

export default UserHandler
