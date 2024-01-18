const mongoose =  require("mongoose");
const bcrypt = require('bcrypt');


const productSchema = new mongoose.Schema({
    productName : String,
    description : String,
    price : Number,
    imgLink : String,
    inStock : Boolean,
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

userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password') || user.isNew){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }
    next();
})


const User = mongoose.model('User', userSchema)



module.exports = {
    Product,User
}