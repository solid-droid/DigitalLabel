const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
require('dotenv/config')
const mongoose = require('mongoose')
const schema = require('./schema')

//add product to DB

const postProduct = async (req, res) => {
   try{
       const {name, code} = req.body
       const product = new schema({ name, code });
       const saveProduct = await product.save();
       res.status(200).json({success: true, data: saveProduct})
   } catch(err)
   {
       res.status(409).json({success: false, data: [], error: err})
       console.log(err)
   }
}

const getAllProduct = async (req, res) => {
    try{
        const products = await schema.find();
        res.status(200).json({success: true, data: products})
    } catch(err)
    {
        res.status(409).json({success: false, data: [], error: err})
        console.log(err)
    }
};

const getProductByCode = async (req, res) => {
    try{
        const {code} = req.params
        const product = await schema.find({code});
        res.status(200).json({success: true, data: product})
    } catch(err)
    {
        res.status(409).json({success: false, data: [], error: err})
        console.log(err)
    }
}

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes

app.get('/', (req, res) => {
    res.json({success:true, data: ["hello"]})
  })

app.get('/getAllProduct', getAllProduct)

app.get('/getProductByCode/:code', getProductByCode)
  
app.post('/add', postProduct)

//mongoDB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('DB connected'))

//DB Schema



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })