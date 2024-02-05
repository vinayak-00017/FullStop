const express = require('express');
require('dotenv').config()
const router = express.Router();
const jwt = require('jsonwebtoken')
const SECRET = `${process.env.SECRET}`;
const bcrypt = require('bcrypt');
const {authenticateJwt} = require("../middleware/auth");
const { User } = require('../db/User');
const { Order } = require('../db/Order');
const { v4: uuidv4 } = require('uuid');


router.get("/me",authenticateJwt,async(req,res)=>{
    const user = await User.findOne({username: req.user.username})
    if(!user){
        res.send(403).json({message : "user does not exist"})
    }else{
        const user = req.user
        res.status(200).json({message: 'user verified',user})
    }

})


router.post('/signup',async(req,res) => {
    const {username , password} = req.body;
    const user = await User.findOne({username})
    if(user){
        res.status(400).json({message : 'user already exists'})
    }else{
        const newUser = new User({username,password})
        await newUser.save();
        const token = jwt.sign({username,role : 'user'},SECRET,{expiresIn : '24h'})
        res.json({message : 'user created successfully',token})
    }   
})

router.post('/login',async(req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if(user && bcrypt.compareSync(password,user.password)){
        const token = jwt.sign({username,role : 'user'},SECRET,{expiresIn: '24h'})
        return res.json({message : "user logged in", token})
    }
    res.status(403).json({message : "invalid credentials"})
}) 

router.get('/orders',authenticateJwt,async(req,res) => {
    const orders = await Order.find({username: req.user.username})
    res.json(orders);
})


router.get('/profile',authenticateJwt,async(req,res)=>{
    const user = await User.findOne({username:req.user.username}).select('-password')
    if(user){
        return res.json(user)
    }
    res.status(404).json({message : 'user not found'})
})


router.put('/profile',authenticateJwt, async(req,res)=>{
    const updatedUser = await User.findOneAndUpdate({username : req.user.username},req.body)
    if(updatedUser){
        res.json({message:'user updated successfully'})
    }else{
        res.status(404).json({message: 'user not found'})
    }
})

router.post('/demo',authenticateJwt,async(req,res)=>{
    const {name, houseAddress, city, country, zip, mobileNumber,sCart,total} = req.body;
    const user = await User.findOne({username:req.user.username})
    if(user){
        newOrder = new Order({
            date:new Date().toISOString().split('T')[0],
            username : req.user.username,
            orderId: uuidv4(),
            address:{
                name,
                houseAddress,
                city,
                zip,
                country,
                mobileNumber
            },
            products: sCart.map((item)=>({
                productId : item.id,
                quantity : item.quantity,
                size : item.size
              })),
              totalPrice : total
        })
        await newOrder.save()
        res.json({message: 'order placed', newOrder})
    }else{
        res.status(404).json({message:'order not found'})
    }
})

module.exports = router;

