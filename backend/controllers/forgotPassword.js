require('dotenv').config()
const jwt = require('jsonwebtoken')
const user = require('../models/users')
const admin = require('../models/adminUsers')
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer');
const logs = require('../models/logs')





const forgotPass = (req, res) => {
    const {email} = req.body

    try {
        user.find({email: email}, (err, result) =>{
            if(result == ''){
                admin.find({email: email}, (err, result) =>{
                    if(result == '') {
                        res.render('email-not-sent')
                        return
                    } else {
                        getEmail(req, res, result)
                    }
                })
                
            } else {
                getEmail(req, res, result)
            }
        })
    } catch (error) {
        res.render('404')
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
    
    try {

        user.findById(id, async (err, result) => {
            const currentUser= result
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
                        logs.create({
                            author: `${currentUser.fname} ${currentUser.lname}`,
                            section: 'Registration',
                            action: 'Reset password.',
                            userID: `${currentUser.id}`
                          })

                        res.redirect('/')
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

const getEmail = (req, res, result) =>{
    
    const secret = process.env.ACCESS_TOKEN_SECRET + result[0].password
    const currentUser= result[0]
                const payload = {
                    email: result[0].email,
                    id: result[0].id
                }
                
                const token =jwt.sign(payload, secret, {expiresIn: '15m'})
                const link = `http://localhost:3000/reset-password/${result[0].id}/${token}`

                //For email sending
                const bhemail = 'biyaheroesconnect@gmail.com'
                const receivers = [result[0].email, bhemail]
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'biyaheroesconnect@gmail.com',
                      pass: 'eehntnjcdbowbdko'
                    }
                  });
                  
                  const mailOptions = {
                    from: 'biyaheroesconnect@gmail.com',
                    to: receivers[0].toString() ,
                    subject: 'BiyaHeroes: Reset password.',
                    text: `Please click this link to reset your password ${link}.`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error.message);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

                  logs.create({
                    author: `${currentUser.fname} ${currentUser.lname}`,
                    section: 'Registration',
                    action: 'Requested password reset link.',
                    userID: `${currentUser.id}`
                  })
                  res.render('email-sent')
                  
}

module.exports = {
    forgotPass,
    getResetPassPage,
    resetPass
}