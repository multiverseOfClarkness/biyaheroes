const user = require('../models/users')
const jwtdecode = require('jwt-decode')
const moment = require('moment')


const getCommuterProfile = async (req,res) => {
    const currentUser = await user.findOne({email: jwtdecode(req.cookies.token).email})
    const formattedDate = moment(currentUser.birthday).format('DD-MM-YYYY')
    
    
    user.find({_id : currentUser._id}, (err, user) => {
        res.render('commuter-profile', {
            
            userDetails : user,
            formattedDate
        } )
        
    })
    
}

module.exports = {
    getCommuterProfile
}

