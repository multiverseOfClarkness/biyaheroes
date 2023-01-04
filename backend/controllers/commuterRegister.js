const path = require('path')
const User = require('../models/users')
const bcryptjs = require('bcryptjs')




const getRegisterForm = (req, res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'signup.html'))
}

const createNewUser = async (req, res) => {
    try {
        const body = await req.body
        const salt = await bcryptjs.genSalt(10);
        
        //password hashing
        const hashedPassword = await bcryptjs.hash(body.verifiedpass, salt)
        
        let newUser = new User ({
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        verifiedpass: hashedPassword
        });
        
        await newUser.save()
        res.redirect('/')
    } catch (error) {
        if (error.code === 11000) {
            res.render('resend-user-register-page.ejs')
        }
    }
                    
        
}

module.exports = {
    getRegisterForm,
    createNewUser
}
