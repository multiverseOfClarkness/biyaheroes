require('dotenv').config()
const path = require ('path')
const bcryptjs =require('bcryptjs')
const commonUsers = require('../models/users.js')
const jwt = require('jsonwebtoken')
const { rmSync } = require('fs')



const getLoginForm = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'commuter-login.html'))
}

const login = async (req, res) => {
    //Authenticate user
    try {
        const body = await req.body
        
        let email = body.email
        let password = body.password
        
        
        const user = await commonUsers.findOne({email:email})
        const isMatchUser = await bcryptjs.compare(password, user.verifiedpass)
       
        if(user){
            if(isMatchUser){
                const userEmail = body.email
                const user = { email:userEmail}
                //GENERATE TOKEN
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                res.cookie('jwt', accessToken, {httpOnly: true})
                res.redirect('/commuter/dashboard')
                
            }else{
                res.send('invalid username/password')
            }
        }else{
            res.send('invalid username/password')
        }
    
    }catch (error){
        res.send('Invalid username/password')
    }
    
}

const getDashboard = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'home.html'))
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'})
}

module.exports = {
    getLoginForm,
    login,
    getDashboard
}

