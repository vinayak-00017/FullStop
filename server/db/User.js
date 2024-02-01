const mongoose =  require("mongoose");
const hashPassword = require('../middleware/hashing')


//USER
const userSchema = new mongoose.Schema({
    username : String,
    password : String,

})

userSchema.pre('save',function(next){
    hashPassword(this,next);
})

const User = mongoose.model('User', userSchema)


module.exports = {
    User
}