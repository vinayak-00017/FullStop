const mongoose =  require("mongoose");

const productSchema = new mongoose.Schema({
    productName : String,
    description : String,
    price : Number,
    imgLink : String,
    ratings  : [
        {
            userId : String,
            rating : Number
        }
    ],
    discount : Number

})

const Product = mongoose.model('Product', productSchema)


module.exports = {
    Product
}