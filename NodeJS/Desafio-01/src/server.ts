import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (resquest, response) => {
    return response.json({ message: "Server running and all good!!!"})
})

app.listen(3000, () => { console.log("Server is running!") })