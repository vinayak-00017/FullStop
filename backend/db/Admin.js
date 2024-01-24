const mongoose =  require("mongoose");
const hashPassword = require('../middleware/hashing')

//Admin
const adminSchema = new mongoose.Schema({
    username : String,
    password : String,
})

adminSchema.pre('save',function(next){
    hashPassword(this,next);
})

const Admin = mongoose.model('Admin',adminSchema)


module.exports = {
    Admin
}