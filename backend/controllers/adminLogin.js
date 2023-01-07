require('dotenv').config()
const path = require ('path')
const bcryptjs =require('bcryptjs')
const adminUsers = require('../models/adminUsers.js')
const jwt = require('jsonwebtoken')
const { rmSync } = require('fs')



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
        const isMatchAdmin = await bcryptjs.compare(password, admin.password)
       
        if(admin) {
            if(isMatchAdmin){
                const userEmail = body.email
                const user = { email:userEmail}
                //GENERATE TOKEN
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                res.cookie('token', accessToken, {httpOnly: true})
                res.redirect('/admin/dashboard')
                
            }else {
                res.send('Invalid password/username.')
            }
        }else{
            res.send('Invalid username/password.')
        }

    }catch (error){
        res.send('Invalid username/password')
    }
    
}



module.exports = {
    getLoginForm,
    login
}


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

