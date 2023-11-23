import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import userHandler from './handler/user-handler.js'

import Database from '../src/persistence/mongoose-connection.js'

import { applyKeywordItemSearch } from './handler/search-filter.js'

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
const port = 8000
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
  console.log(userHandler.getId())
})

app.get('/users', async (req, res) => {
  const users = await Database.getUsers()
  const statusCode = users === undefined ? 500 : 200

  res.status(statusCode).send(users)
})

app.post('/users', async (req, res) => {
  const createdUser = await userHandler.createUser(req.body)

  const statusCode = createdUser === undefined ? 400 : 201

  res.status(statusCode).json(createdUser || {})
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await Database.findUserById(id)

  const statusCode = user === undefined ? 404 : 200

  res.status(statusCode).send(user || {})
})

app.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId
  await Database.deleteUser(userId)

  res.status(204).send()
})

app.delete('/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId
  await Database.deleteItem(itemId)

  res.status(204).send()
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

app.put('/users/:userId/wishlist/:itemId', async (req, res) => {
  const userId = req.params.userId
  const itemId = req.params.itemId

  const editedWishlist = await Database.addToWishList(userId, itemId)
  const statusCode = editedWishlist === undefined ? 500 : 200

  res.status(statusCode).send(editedWishlist)
})

app.post('/users/:userId/items', async (req, res) => {
  const userId = req.params.userId
  const createdItem = await Database.createItem(req.body, userId)
  const statusCode = createdItem === undefined ? 500 : 201

  res.status(statusCode).send(createdItem || {})
})

app.get('/users/:userId/items', async (req, res) => {
  const userId = req.params.userId
  const items = await Database.findItemsByUserId(userId)
  const statusCode = items === undefined ? 500 : 200

  res.status(statusCode).send(items || [])
})

app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening.')
})
