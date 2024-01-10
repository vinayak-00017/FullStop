import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName : String,
    description : String,
    price : Number,
    imgLink : String

})

const Product = mongoose.model('Product', productSchema)


module.exports = {
    Product
}