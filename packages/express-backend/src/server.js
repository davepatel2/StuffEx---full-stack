import express from 'express'


const app = express()
const port = 8000

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
