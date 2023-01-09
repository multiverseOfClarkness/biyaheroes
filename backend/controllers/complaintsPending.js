const violationReports = require('../models/violationReports')

const getPendingComplaintsPage = async (req,res) => {
    
    violationReports.find({}, (err, violationReports) => {
        res.render('complaints-pending', {
            violationList : violationReports
        })  
    })
    
}



module.exports = {
    getPendingComplaintsPage
}