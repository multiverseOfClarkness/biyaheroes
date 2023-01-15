const admin = require('../models/adminUsers')
const jwtdecode = require('jwt-decode')


const getAdminDashboard = async (req,res) => {
    try {
        const currentUser = await admin.findOne({email: jwtdecode(req.cookies.token).email})
        
        
        admin.find({_id : currentUser._id}, (err, admin) => {
            res.render('admin-dashboard', {
                adminDetails : admin
            } )
            
        })
    } catch (error) {
        console.log(error)
        //res.redirect('/logout')
    }
    
}

module.exports = {
    getAdminDashboard
}