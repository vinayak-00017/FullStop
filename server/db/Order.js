const mongoose =  require("mongoose");

//Order
const orderSchema = new mongoose.Schema({
    orderId: String,
    username : String,
    address: {
        name : String,
        houseAddress : String,
        city : String,
        zip : String,
        country : String,
        mNumber : String
    },
    products : [
        {
            productId : {type: mongoose.Schema.Types.ObjectId, ref : 'Product'},
            quantity : Number,
            size : Number
        }
    ],
    totalPrice : Number,
    date : String,
    isDelivered : {type : Boolean, default : false}
})

const Order = mongoose.model('Order', orderSchema)


module.exports={
    Order
}