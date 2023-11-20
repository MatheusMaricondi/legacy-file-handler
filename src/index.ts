import express from 'express'
import routes from './routes/index'
// import '../src/services/mongo.service'
require('dotenv').config()

const port = process.env.APP_PORT
const app = express()

app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`Server running at localhost:${port}`))