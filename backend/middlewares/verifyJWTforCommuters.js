require('dotenv').config()
const user = require('../models/users')
const admin = require('../models/adminUsers')


const jwt = require('jsonwebtoken')

const verifyJWTforCommuters = (req, res, next) => {
   
    const token = req.cookies.token


    if (token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err, decodedToken) => {
           
            if(err){
                
                res.render('login')
            }else{
                
                user.findOne({email: decodedToken.email}, (err, data) =>{
                    res.locals.A = data
                next()
                })
            }
        })
    }else{
        res.redirect('/')
    }
}

const verifyJWTforAdmin = (req, res, next) => {
   
    const token = req.cookies.token


    if (token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('/')
            }else{
                admin.findOne({email: decodedToken.email}, (err, data) =>{
                    res.locals.B = data
                    next()
                })
                
            }
        })
    }else{
        res.redirect('/')
    }
}

module.exports = {
    verifyJWTforCommuters,
    verifyJWTforAdmin,
    
}