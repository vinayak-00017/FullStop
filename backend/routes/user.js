const express = require('express');
const {User} =  require('../db')
require('dotenv').config()
const router = express.Router();
const jwt = require('jsonwebtoken')
const SECRET = `${process.env.SECRET}`;
const bcrypt = require('bcrypt');
const {authenticateJwt} = require("../middleware/auth")


router.get("/me",authenticateJwt,async(req,res)=>{
    const user = await User.findOne({username: req.user.username})
    if(!user){
        res.send(403).json({message : "user does not exist"})
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
        const token = jwt.sign({username,role : 'user'},SECRET,{expiresIn : '2h'})
        res.json({message : 'user created successfully',token})
    }   
})

router.post('/login',async(req,res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if(user && bcrypt.compareSync(password,user.password)){
        const token = jwt.sign({username,role : 'user'},SECRET,{expiresIn: '2h'})
        return res.json({message : "user logged in", token})
    }
    res.status(403).json({message : "invalid credentials"})
}) 


module.exports = router;

