import app from './app'
const port = process.env.APP_PORT


app.listen(port, () => {
    console.log('* API docs on http://localhost:3000/api-docs') 
    console.log(`* Server is running on http://localhost:${port}`)
})