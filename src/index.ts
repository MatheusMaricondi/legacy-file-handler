import express from 'express'
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'

require('dotenv').config()

const port = process.env.APP_PORT
const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/v1', routes)

app.listen(port, () => console.log(`Server running at localhost:${port}`))