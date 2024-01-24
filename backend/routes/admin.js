const express = require('express');
const { Admin } = require('../db/Admin');
const router = express.Router()
const ASECRET = `${process.env.ASECRET}`
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


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

module.exports = router;


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

