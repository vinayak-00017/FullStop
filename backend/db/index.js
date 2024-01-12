const mongoose =  require("mongoose");

const productSchema = new mongoose.Schema({
    productName : String,
    description : String,
    price : Number,
    imgLink : String,
    ratings  : [
        {
            userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
            rating : Number
        }
    ],
    discount : Number


})
const Product = mongoose.model('Product', productSchema)


const userSchema = new mongoose.Schema({
    username : String,
    password : String


})
const User = mongoose.model('User', userSchema)



module.exports = {
    Product,User
}