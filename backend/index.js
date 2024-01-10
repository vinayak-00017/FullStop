import express from 'express'
const productRouter = require('./routes/product')
import cors from 'cors'
import mongoose from 'mongoose'
require('dotenv').config()

app.use(cors())
app.use(express.json());


app.use('/product',productRouter);

mongoose.connect(`${process.env.MONGO_URL}`)

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})