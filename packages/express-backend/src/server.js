import cors from 'cors'
import express from 'express'
import UserHandler from './handler/user-handler.js'


const app = express()
app.use(cors())
const port = 8000
app.use(express.json())

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

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
