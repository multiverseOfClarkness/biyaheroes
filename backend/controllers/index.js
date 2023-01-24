const path = require('path')
const commonUsers = require('../models/users')
const admin = require('../models/adminUsers')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const getLoginForm = (req, res) => {
    res.render('login')
}

const login = async (req, res) => {
    //Authenticate user
    try {
        const body = await req.body
        
        let email = body.email
        let password = body.password
        
        
        const user1 = await commonUsers.findOne({email:email})
        const user2 = await admin.findOne({email:email})
        
       
        if(user1){
            const isMatchUser1 = await bcryptjs.compare(password, user1.verifiedpass)
            
            if(isMatchUser1){
                const userEmail = body.email
                const user = { email:userEmail}
                //GENERATE TOKEN
                const accessToken = generateAccessToken(user)
                res.cookie('token', accessToken, {httpOnly: true})
                return res.redirect('/commuter/dashboard')
                
            }else{
                res.sendFile(path.resolve('./', 'frontend', 'views', 'login-wrong-pass.html'))
            }
        }else if (user2) {
            
            const isMatchUser2 = await bcryptjs.compare(password, user2.password)
            if(isMatchUser2){
                const userEmail = body.email
                const user = { email:userEmail}
                //GENERATE TOKEN
                const accessToken = generateAccessToken(user)
                res.cookie('token', accessToken, {httpOnly: true})
                if (user2.role === 'admin') {
                    return res.redirect('/admin/dashboard')
                } else {
                    return res.redirect('/super-admin/dashboard')
                }
                
                
            }else{
                res.sendFile(path.resolve('./', 'frontend', 'views', 'login-wrong-pass.html'))
            }
        }
        else{
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