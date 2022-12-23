require('dotenv').config()


const jwt = require('jsonwebtoken')

const verifyJWTforCommuters = (req, res, next) => {
   
    const token = req.cookies.token


    if (token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('/commuter')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/commuter')
    }
}

const verifyJWTforAdmin = (req, res, next) => {
   
    const token = req.cookies.token


    if (token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.redirect('/admin')
            }else{
                console.log(decodedToken)
                next()
            }
        })
    }else{
        res.redirect('/admin')
    }
}

module.exports = {
    verifyJWTforCommuters,
    verifyJWTforAdmin
}