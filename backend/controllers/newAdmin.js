const path = require ('path')
const Admin = require('../models/adminUsers')
const bcryptjs = require('bcryptjs')



const getAddNewAdmin = (req, res) => {
    res.render('add-member')
}

const addNewAdmin = async (req, res) => {
    const body = await req.body
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(body.password, salt)

    let newUser = new Admin ({
        role: req.body.role,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword
    })
    newUser.save()
    res.redirect('/admin/dashboard')


}


module.exports = {
    getAddNewAdmin,
    addNewAdmin
}
