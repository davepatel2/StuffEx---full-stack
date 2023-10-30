import cors from 'cors'
import express from 'express'

import ItemHandler from './handler/item-handler.js'
import UserHandler from './handler/user-handler.js'


const app = express()
app.use(cors())
const port = 8000
app.use(express.json())

const itemHandler = new ItemHandler()
const userHandler = new UserHandler()

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
    console.log(userHandler.getId())
})

app.get('/users', (req, res) => {
    res.status(200).send(userHandler.getUsers())
})

app.post('/users', (req, res) => {
    const createdUser = userHandler.createUser(req.body)

    const statusCode = createdUser === undefined ? 400 : 201

    res.status(statusCode).json(createdUser || {})
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = userHandler.getUserById(id)

    const statusCode = user === undefined ? 404 : 200

    res.status(statusCode).send(user || {})
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id
    userHandler.deleteUser(id)

    res.status(204).send()
})

app.get('/items', (req, res) => {
    res.status(200).send(itemHandler.getItems())
})

app.get('/items/:id', (req, res) => {
    const id = req.params.id
    const item = itemHandler.getItemById(id)

    const statusCode = item === undefined ? 404 : 200

    res.status(statusCode).send(item || {})
})

app.post('/items', (req, res) => {
    const createdItem = itemHandler.createItem(req.body)

    const statusCode = createdItem === undefined ? 400 : 204

    res.status(statusCode).send(createdItem || {})
})

app.get('/users/:userId/items', (req, res) => {
    const userId = req.params.userId
    const user = userHandler.getUserById(userId)

    // If user id is invalid, return 404
    if (user === undefined) {
        res.status(404).send({})
        return
    }

    const itemIds = user.items || []
    const items = []

    itemIds.forEach(itemId => {
        const item = itemHandler.getItemById(itemId)

        if (item === undefined) {
            return
        }

        items.push(item)
    })

    res.status(200).send(items)
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
