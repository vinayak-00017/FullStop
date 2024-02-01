const express = require('express');
const { Admin } = require('../db/Admin');
const router = express.Router()
const ASECRET = `${process.env.ASECRET}`
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { adminAuthenticateJwt } = require('../middleware/auth');



router.get('/me',adminAuthenticateJwt,async(req,res) =>{
    const admin = await Admin.findOne({username: req.admin.username})
    if(admin){
        const admin = req.admin
        res.json({message : 'admin verified',admin})
    }else{
        res.status(404).json("admin not found")
    }
})


router.post('/signup',async(req,res)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({username})
    if(admin){
        return res.status(400).json({message : 'admin already exists'})
    }
    const newAdmin = new Admin({username,password})
    await newAdmin.save()
    const token = jwt.sign({username,role : 'admin'},ASECRET,{expiresIn : '2h'})
    res.json({message : 'admin created successfully',token})
})



router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const admin = await Admin.findOne({username})
    if(admin && bcrypt.compareSync(password,admin.password)){
        const token = jwt.sign({username,role: 'admin'},ASECRET,{expiresIn : '2h'})
        res.json({message : 'admin logged in', token})
    }else{
        res.status(403).json({message : 'invalid credentials'})
    }
})



module.exports = router;