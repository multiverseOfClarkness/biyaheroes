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
    
    
    
    try {
        const reqProfile = await JSON.parse(body.profile)
        
        await user.updateOne({email : currentUser.email}, {
            fname: reqFname,
            lname: reqLname,
            address: reqAddress,
            birthday: reqBirthday,
            phone: reqPhone,
            email: reqEmail,
            profileImage: new Buffer.from(reqProfile.data, 'base64'),
            profileImageType: reqProfile.type

        })
        
        res.redirect('/logout')
    } catch (error) {
        console.log(error.message)
        if(error.message === 'Unexpected end of JSON input'){
            await user.updateOne({email : currentUser.email}, {
                fname: reqFname,
                lname: reqLname,
                address: reqAddress,
                birthday: reqBirthday,
                phone: reqPhone,
                email: reqEmail
    
            })
            
            res.redirect('/logout')
        }
        
    }

}

const commuterChangePass = async (req, res) => {
    res.render('commuter-change-pass')
}



module.exports = {
    getCommuterProfile,
    updateCommuterProfile,
    commuterChangePass
}

