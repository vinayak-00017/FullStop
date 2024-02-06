const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = `${process.env.SECRET}`
const ASECRET = `${process.env.ASECRET}`

const authenticateJwt = (req,res,next) => {
    const authHeader = req.headers.authentication;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user) => {
            if(err){
                return res.sendStatus(403)
            }
            req.user = user;
            next();
        })
    }else{
        res.sendStatus(400)
    }
    };

const adminAuthenticateJwt = (req,res,next) => {
    const authHeader = req.headers.authentication;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,ASECRET,(err,admin) => {
            if(err){
                return res.sendStatus(403)
            }
            req.admin = admin;
            next();
        })
    }else{
        res.sendStatus(400)
    }
    };

module.exports = {
    authenticateJwt,
    adminAuthenticateJwt
}    