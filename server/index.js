const express = require ('express')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const cors = require ('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express();
const adminRouter = require('./routes/admin')
const paypalRouter = require('./routes/paypal')

app.use(cors())
app.use(express.json());


app.use('/product',productRouter);
app.use('/user',userRouter);
app.use('/admin',adminRouter)
app.use('/paypal',paypalRouter)

mongoose.connect(`${process.env.MONGO_URL}`)

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})