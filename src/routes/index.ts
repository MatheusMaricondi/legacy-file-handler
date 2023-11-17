import express, { Response } from 'express'

const upload = require('../helpers/upload')
const app = express()

app.get('/upload', upload.single('file'), (req: any, res: Response) => {
    try {
        res.status(201).json({message: 'clients file was sucessfully uploaded', file: req.file})
    }catch(err) {
        res.status(500).json('Upload failed error')
    }
})

export default app