const user = require('../models/users')
const jwtdecode = require('jwt-decode')
const moment = require('moment')
const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']




const getCommuterProfile = async (req,res) => {
    try {
        const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})
        const formattedDate = moment(currentUser.birthday).format('MM/DD/YYYY')
        
        user.find({_id : currentUser._id}, (err, user) => {
            res.render('commuter-profile', {
                
                userDetails : user,
                formattedDate
            } )
            
        })
    } catch (error) {
        
        res.redirect('/logout')
    }
    
}

const updateCommuterProfile = async (req, res) => {
    const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})
    const body = req.body
    
    const reqFname = body.firstName
    const reqLname = body.lastName
    const reqBirthday = body.birthday
    const reqAddress = body.address
    const reqPhone = body.phone
    const reqEmail = body.email
    const reqPassword = body.password
    
    
    await user.updateOne({email : currentUser.email}, {
        fname: reqFname,
        lname: reqLname,
        address: reqAddress,
        birthday: reqBirthday,
        phone: reqPhone,
        email: reqEmail,
        password: reqPassword
    })

    res.redirect('/logout')
    

}

const saveImageAsBinary = async (user, imageEncoded) => {
    try {
        if (imageEncoded === undefined || imageEncoded === null) return;

        const profileImage = await JSON.parse(imageEncoded)

        if (profileImage != null && imageMimeTypes.includes(profileImage.type)) {
            user.profileImage = new Buffer.from(profileImage.data, 'base64')
    }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCommuterProfile,
    updateCommuterProfile
}

