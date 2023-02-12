const path = require('path')
const User = require('../models/users')
const logs = require('../models/logs')
const bcryptjs = require('bcryptjs')




const getRegisterForm = async (req, res) => {
    const b = []
    const existingUser = await User.find()
    existingUser.forEach(data =>{
        b.push(data.email)
    })
    
    res.render('signup', {b})
}

const createNewUser = async (req, res) => {
    try {
        
        const body = await req.body
        const salt = await bcryptjs.genSalt(10);
        
        //password hashing
        const hashedPassword = await bcryptjs.hash(body.confirmpass, salt)
        
        let newUser = new User ({
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword
        });
        
        newUser.save((err, user) => {
            const currentUser = user
            logs.create({
                author: `${currentUser.fname} ${currentUser.lname}`,
                section: 'Registration',
                action: 'Created new account.',
                userID: `${currentUser.id}`
              })
        })
        res.redirect('/')
    } catch (error) {
        
        console.log(error.message)
    }
                    
        
}

module.exports = {
    getRegisterForm,
    createNewUser
}
