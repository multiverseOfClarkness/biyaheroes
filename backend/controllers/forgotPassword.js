require('dotenv').config()
const jwt = require('jsonwebtoken')
const user = require('../models/users')
const bcryptjs = require('bcryptjs')



const forgotPass = (req, res) => {
    const {email} = req.body

    try {
        user.find({email: email}, (err, result) =>{
            if(result == ''){
                res.send('Email not registered')
                return
            } else {
                const secret = process.env.ACCESS_TOKEN_SECRET + result[0].password
                const payload = {
                    email: user.email,
                    id: result[0].id
                }
                const token =jwt.sign(payload, secret, {expiresIn: '15m'})
                const link = `http://localhost:3000/reset-password/${result[0].id}/${token}`
                console.log(link)
            }
        })
    } catch (error) {
        res.send(error)
    }
    
}

const getResetPassPage = (req, res) => {
    const {id, token} = req.params
    
    try {
        user.findById(id, (err, result) => {
            if(result == ''){
                res.send('Invalid id.')
            } else {
                
                const secret = process.env.ACCESS_TOKEN_SECRET + result.password
                try {
                    const payload = jwt.verify(token, secret)
                    res.render('reset-pass', {data: result, token})
                } catch (error) {
                    res.send(error)
                }

            }
        })
    } catch (error) {
        res.send(error)
    }
}

const resetPass = async (req, res) => {
    const {id, token} = req.params
    const {retypepass} = req.body
    console.log(id)
    try {

        user.findById(id, async (err, result) => {
            
            if(result == ''){
                res.send('Invalid id.')
                return;
            } else {
                const secret = process.env.ACCESS_TOKEN_SECRET + result.password
                try {
                    const payload = jwt.verify(token, secret)
                    const salt = await bcryptjs.genSalt(10);
                    const newPass = await bcryptjs.hash(retypepass, salt)
                    user.findByIdAndUpdate(id, {password: newPass},{new: true}, (err, result) =>{
                        res.send(result)
                    })
                    
                    
                    
                } catch (error) {
                    console.log(error)
                }

            }
        })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    forgotPass,
    getResetPassPage,
    resetPass
}