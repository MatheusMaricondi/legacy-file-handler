import express from 'express'
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/v1', routes)

export = app

