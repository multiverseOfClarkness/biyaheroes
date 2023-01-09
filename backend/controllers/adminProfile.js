const admin = require('../models/adminUsers')
const jwtdecode = require('jwt-decode')


const getAdminProfilePage = async (req,res) => {
    try {
        const currentUser = await admin.findOne({email: jwtdecode(req.cookies.token).email})
        
        
        admin.find({_id : currentUser._id}, (err, admin) => {
            res.render('profile', {
                adminDetails : admin
            } )
            
        })
    } catch (error) {
        console.log(error)
        //res.redirect('/logout')
    }
    
}

module.exports = {
    getAdminProfilePage
}