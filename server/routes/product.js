const express = require('express');
const { Product } = require('../db/Product');
const { authenticateJwt, adminAuthenticateJwt } = require('../middleware/auth');
const { User } = require('../db/User');


const router = express.Router();



router.post('/new',adminAuthenticateJwt, async(req,res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.json({message : 'product created successfully'})
})


router.get('/all', async(req,res) => {
    const products = await Product.find({})
    res.json({products})
})


router.get("/single/:id",async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id)
    const ratingsSum = product.ratings.reduce((sum,rating) => sum + rating.rating, 0)
    const ratingsAverage = ratingsSum/product.ratings.length 
    if(!product){
        res.status(404).json({message : 'product not found'})
    }
    res.json({product, ratingsAverage})
})


router.put('/update/:id',adminAuthenticateJwt,async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id,req.body, {new: true})
    if(product){
        res.json({message: "product updated successfully"})
    }else{
        res.status(404).json({message : 'product not found'})
    }
})

router.delete('/delete/:id',adminAuthenticateJwt,async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id)
    if(!product){
        return res.status(404).json({message : 'product not found!'})
    }else{
        res.json({message: 'product deleted !!'})
    }
})


router.put('/review/:id',authenticateJwt,async(req,res)=>{
    const id = req.params.id;
    const {rating,comment} = req.body
    const user = await User.findOne({username: req.user.username})
    if(user){
        const product = await Product.findById(id)
        if(product){
            const existingReviewIndex = product.ratings.findIndex(r => r.userId.toString() === user._id.toString())
            if(existingReviewIndex >=0){
                product.ratings[existingReviewIndex].rating = rating;
                product.ratings[existingReviewIndex].comment = comment;
                product.ratings[existingReviewIndex].date = new Date().toISOString().split('T')[0]
                
                await product.save();
                res.json({message : 'Review updated successfully'})
            }else{
                const review = {
                    userId : user._id,
                    username : user.username,
                    rating,
                    comment,
                    date : new Date().toISOString().split('T')[0],
                    
                }
                product.ratings.push(review);
                await product.save();
                res.json({message: 'Review added successfully'})
            }
        }else{
            res.status(404).json({message : 'product not found'})
        }
    }else{
        res.status(404).json({message : 'user not found'})
    }
})

module.exports = router