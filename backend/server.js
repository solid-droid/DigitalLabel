const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
require('dotenv/config')
const mongoose = require('mongoose')
const schema = require('./schema')

//add product to DB

const postProduct = async (req, res) => {
    console.log(req.body)
    res.send("data")
}

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes

app.get('/', (req, res) => {
    res.json({success:true, data: ["hello"]})
  })
  
app.post('/add', postProduct)

//mongoDB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('DB connected'))

//DB Schema



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })