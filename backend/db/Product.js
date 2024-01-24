const mongoose =  require("mongoose");

//Product
const productSchema = new mongoose.Schema({
    productName : String,
    description : String,
    price : Number,
    imgLink : String,
    inStock : Boolean,
    sizes : [],
    ratings  : [
            {
            userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
            username : String,
            rating : Number,
            comment : String,
            category : String,
            date: {
                type: String,
                // default: () => {
                //     const now = new Date();
                //     const year = now.getUTCFullYear();
                //     const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // January is 0
                //     const day = String(now.getUTCDate()).padStart(2, '0');
                //     return `${year}-${month}-${day}`; // Returns a string in the format 'YYYY-MM-DD'
                // }
              }
            }
        ],
    discount : Number

})
const Product = mongoose.model('Product', productSchema)

module.exports={
    Product
}

