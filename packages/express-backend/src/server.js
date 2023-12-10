import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import Database from '../src/persistence/mongoose-connection.js'
import Passwords from './handler/passwords.js'

import { applyKeywordItemSearch } from './handler/search-filter.js'

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
const port = 8000
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

app.get('/users', async (req, res) => {
  const users = await Database.getUsers()
  const statusCode = users === undefined ? 500 : 200

  res.status(statusCode).send(users)
})

app.post('/users', async (req, res) => {
  const createdUser = await Database.createUser(req.body)

  const statusCode = createdUser === undefined ? 400 : 201

  res.status(statusCode).json(createdUser || {})
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await Database.findUserById(id)

  const statusCode = user === undefined ? 404 : 200
  console.log(user)
  res.status(statusCode).send(user || {})
})

app.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId

  Passwords.authenticateUser(req, userId)
    .then(async () => {
      await Database.deleteUser(userId)
      res.status(204).send()
    })
    .catch((error) => {
      const { statusCode, message } = error
      res.status(statusCode).send(message)
    })
})

app.delete('/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId
  const item = Database.findItemById(itemId)

  // If the item does not exist, return success
  if (item === undefined) {
    res.status(204).send()
    return
  }

  const userId = item.seller_id
  Passwords.authenticateUser(req, userId)
    .then(async () => {
      await Database.deleteItem(itemId)
      res.status(204).send()
    })
    .catch((error) => {
      const { statusCode, message } = error
      res.status(statusCode).send(message)
    })
})

app.get('/items', async (req, res) => {
  const items = await Database.getItems()

  const query = req.query.q
  if (query !== undefined) {
    const filteredItems = applyKeywordItemSearch(query, items)
    res.status(200).send(filteredItems)
  } else {
    res.status(200).send(items)
  }
})

app.get('/items/:id', async (req, res) => {
  const id = req.params.id
  const item = await Database.findItemById(id)

  const statusCode = item === undefined ? 404 : 200

  res.status(statusCode).send(item || {})
})

app.get('/users/:userId/wishlist', async (req, res) => {
  const userId = req.params.userId
  const wishlist = await Database.getWishlist(userId)
  const statusCode = wishlist === undefined ? 500 : 200

  res.status(statusCode).send(wishlist || [])
})

app.get('/items/:itemId/interested', async (req, res) => {
  const itemId = req.params.itemId
  const interestedUsers = await Database.getItemInterestedUsers(itemId)
  const statusCode = interestedUsers === undefined ? 500 : 200

  res.status(statusCode).send(interestedUsers || [])
})

app.put('/users/:userId/wishlist/:itemId', async (req, res) => {
  const userId = req.params.userId

  Passwords.authenticateUser(req, userId)
    .then(async () => {
      const itemId = req.params.itemId

      const editedWishlist = await Database.addToWishList(userId, itemId)
      const statusCode = editedWishlist === undefined ? 500 : 200

      res.status(statusCode).send(editedWishlist)
    })
    .catch((error) => {
      const { statusCode, message } = error
      res.status(statusCode).send(message)
    })
})

app.delete('/users/:userId/wishlist/:itemId', async (req, res) => {
  const userId = req.params.userId
  const itemId = req.params.itemId

  await Database.removeFromWishList(userId, itemId)

  res.status(204).send()
})

app.post('/login', async (req, res) => {
  const { username } = req.body
  const user = await Database.findUserByUsername(username)

  if (!user) {
    res.status(404).end()
    return
  }

  Passwords.loginUser(req, res, user)
})

app.post('/users/:userId/items', async (req, res) => {
  const userId = req.params.userId

  Passwords.authenticateUser(req, userId)
    .then(async () => {
      const createdItem = await Database.createItem(req.body, userId)
      const statusCode = createdItem === undefined ? 500 : 201
      res.status(statusCode).send(createdItem || {})
    })
    .catch((error) => {
      const { statusCode, message } = error
      res.status(statusCode).send(message)
    })
})

app.get('/users/:userId/items', async (req, res) => {
  const userId = req.params.userId
  const items = await Database.findItemsByUserId(userId)
  const statusCode = items === undefined ? 500 : 200

  res.status(statusCode).send(items || [])
})

app.get('/users/:userId/items-bought', async (req, res) => {
  const userId = req.params.userId
  const items = await Database.findBoughtItemsByUserId(userId)
  const statusCode = items === undefined ? 500 : 200

  res.status(statusCode).send(items || [])
})

app.patch('/users/:sellerId/items/:itemId', async (req, res) => {
  const sellerId = req.params.sellerId

  Passwords.authenticateUser(req, sellerId)
    .then(async () => {
      const itemId = req.params.itemId
      const buyerId = req.body.buyerId

      console.log(req.body)

      if (!buyerId) {
        return res.status(400).send({ error: 'buyerId is required' })
      }

      try {
        const updatedItem = await Database.updateItemBuyerAndAddToUserBought(
          itemId,
          buyerId
        )
        res.status(200).send(updatedItem)
      } catch (error) {
        res.status(500).send({ error: error.message })
      }
    })
    .catch((error) => {
      const { statusCode, message } = error
      res.status(statusCode).send(message)
    })
})

app.get('/users/usernames/:username', async (req, res) => {
  const { username } = req.params

  const user = await Database.findUserByUsername(username)

  const statusCode = user === undefined ? 404 : 200

  res.status(statusCode).send(user)
})

app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening.')
})
