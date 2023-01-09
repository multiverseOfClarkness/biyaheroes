require('dotenv').config()
const path = require ('path')
const bcryptjs =require('bcryptjs')
const adminUsers = require('../models/adminUsers.js')
const jwt = require('jsonwebtoken')



const getLoginForm = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'admin-login.html'))
}

const login = async (req, res) => {
    //Authenticate user
    try {
        const body = await req.body
        
        let email = body.email
        let password = body.password
        
        
        const admin = await adminUsers.findOne({email:email})
       
       
        if(admin) {
            const isMatchAdmin = await bcryptjs.compare(password, admin.password)
            if(isMatchAdmin){
                const userEmail = body.email
                const user = { email:userEmail}
                //GENERATE TOKEN
                const accessToken = generateAccessToken(user)
                res.cookie('token', accessToken, {httpOnly: true})
                return res.redirect('/admin/dashboard')
                
            }else {
                res.sendFile(path.resolve('./', 'frontend', 'views', 'admin-login-wrong-pass.html'))
            }
        }else{
            res.sendFile(path.resolve('./', 'frontend', 'views', 'admin-login-no-email.html'))
        }

    }catch (error){
        console.log(error)
        res.status(500).send('An error has occured with the server. Please try again in a few minutes.')
    }
    
}

module.exports = {
    getLoginForm,
    login
}


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

