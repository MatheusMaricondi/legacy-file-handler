import express, { Request, Response } from 'express'
import { UploadController, QueriesController } from '../constrollers/index'

const upload = require('../helpers/upload')
const app = express()

app.get('/upload', upload.single('file'), async (req: any, res: Response) => {
    try {
        const uploadControllerInstance = new UploadController()
        await uploadControllerInstance.onCreate(req.file)
        res.status(201).json({message: 'clients file was sucessfully uploaded', file: req.file})
    }catch(err) {
        res.status(500).json({error: `Upload failed error ${err}`})
    }
})

app.get('/orders/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const ordersController = new QueriesController()
        const ordersResponse = await ordersController.getOrderById(parseInt(id))
        res.status(200).json(ordersResponse)
    }catch(err) {
        res.status(500).json({error: `Fetch orders error: ${err}`})
    }
})

app.post('/orders', async (req: Request, res: Response) => {
    try {
        const ordersController = new QueriesController()
        const ordersResponse = await ordersController.getOrderByDate(req.body)
        res.status(200).json(ordersResponse)
    }catch(err) {
        res.status(500).json({error: `Fetch orders error: ${err}`})
    }
})

export default app