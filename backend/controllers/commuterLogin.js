require('dotenv').config()
const path = require ('path')
const bcryptjs =require('bcryptjs')
const commonUsers = require('../models/users.js')
const jwt = require('jsonwebtoken')



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
        
       
        if(user){
            const isMatchUser = await bcryptjs.compare(password, user.verifiedpass)
            if(isMatchUser){
                const userEmail = body.email
                const user = { email:userEmail}
                //GENERATE TOKEN
                const accessToken = generateAccessToken(user)
                res.cookie('token', accessToken, {httpOnly: true})
                return res.redirect('/commuter/dashboard')
                
            }else{
                res.sendFile(path.resolve('./', 'frontend', 'views', 'login-wrong-pass.html'))
            }
        }else{
            res.sendFile(path.resolve('./', 'frontend', 'views', 'login-no-email.html'))
        }
    }catch (error){
        console.log(error)
        res.status(500).send('An error has occured with the server. Please try again in a few minutes.')
    }
    
}


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}



module.exports = {
    getLoginForm,
    login
}

