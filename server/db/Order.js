const mongoose =  require("mongoose");

//Order
const orderSchema = new mongoose.Schema({
    orderId: String,
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
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
    date : {type : Date, default : Date.now},
    isDelivered : {type : Boolean, default : false}
})

const Order = mongoose.model('Order', orderSchema)


module.exports={
    Order
}