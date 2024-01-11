const express = require('express');
const {Product} =  require('../db')

const router = express.Router();



router.get("/single/:id",async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id)
    if(!product){
        res.status(404).json({message : 'product not found'})
    }
    res.json({product})
})


router.post('/new',async(req,res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.json({message : 'product created successfully'})
})


router.get('/all', async(req,res) => {
    const products = await Product.find({})
    res.json({products})
})

module.exports = router