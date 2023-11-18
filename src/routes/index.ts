import express, { Request, Response } from 'express'
import { OrdersController } from '../constrollers/index'

const upload = require('../helpers/upload')
const app = express()

app.get('/upload', upload.single('file'), (req: any, res: Response) => {
    try {
        res.status(201).json({message: 'clients file was sucessfully uploaded', file: req.file})
    }catch(err) {
        res.status(500).json({error: `Upload failed error ${err}`})
    }
})

app.get('/orders', (req: Request, res: Response) => {
    try {
        const ordersController = new OrdersController()
        ordersController.fetchOrders()
        res.status(200).json()
    }catch(err) {
        res.status(500).json({error: `Fetch orders error: ${err}`})
    }
})

export default app