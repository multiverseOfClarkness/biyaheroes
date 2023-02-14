const user = require('../models/users')
const jwtdecode = require('jwt-decode')
const bcryptjs = require('bcryptjs')
const logs = require('../models/logs')


const getChangePass = async (req, res) => {
    res.render('commuter-change-pass')
}


const changePass = async (req, res) => {
    try {
        const body = await req.body
        let password = body.oldPassword
        
        const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})

        if(currentUser) {
            const isMatchUser = await bcryptjs.compare(password, currentUser.verifiedpass)
            if(isMatchUser){
                const salt = await bcryptjs.genSalt(10);
                let newPass = body.newPassword
                let verifiedNewPass = body.verifyNewPassword
                const newHashedPassword = await bcryptjs.hash(verifiedNewPass, salt)

                await user.updateOne({email : currentUser.email}, {
                    
                    password: newPass,
                    verifiedpass: newHashedPassword

                })

                logs.create({
                    author: `${currentUser.fname} ${currentUser.lname}`,
                    section: 'Commuter / profile',
                    action: 'Changed password.',
                    userID: `${currentUser.id}`
                })

                res.redirect('/logout')
            } else {
                console.log('ey')
                getProfileAfterError(req, res)
            }
        }



    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getChangePass, 
    changePass
}



