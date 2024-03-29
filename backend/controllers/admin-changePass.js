const admin = require('../models/adminUsers')
const jwtdecode = require('jwt-decode')
const bcryptjs = require('bcryptjs')
const logs = require('../models/logs')




const getChangePass = async (req, res) => {
    res.render('admin-change-pass')
}

const changePass = async (req, res) => {
    try {
        const body = await req.body
        let password = body.oldPassword
        
        const currentUser = await admin.findOne({email: jwtdecode(req.cookies.token).email})

        if(currentUser) {
            const isMatchUser = await bcryptjs.compare(password, currentUser.password)
            if(isMatchUser){
                const salt = await bcryptjs.genSalt(10);
                let verifiedNewPass = body.verifyNewPassword
                const newHashedPassword = await bcryptjs.hash(verifiedNewPass, salt)

                await admin.updateOne({email : currentUser.email}, {
                    
                    password: newHashedPassword

                })

                logs.create({
                    author: `${currentUser.fname} ${currentUser.lname}`,
                    section: 'Admin / profile',
                    action: 'Change pass.',
                    userID: `${currentUser.id}`
                })
                res.redirect('/logout')
            } else {
                //res.render('admin-change-pass-error')
                res.send('hi')
            }
        }



    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getChangePass, changePass
}



