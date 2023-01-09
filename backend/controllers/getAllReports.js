const violationReports = require('../models/violationReports')
const missingItemReports = require('../models/missingItemReports')

const getViolationReportsHistory = async (req,res) => {
    
    violationReports.find({}, (err, violationReports) => {
        res.render('complaints-pending', {
            violationList : violationReports
        })
    })
    
}
const getMissingItemsReportsHistory = async (req,res) => {
    const currentUser = await users.findOne({email: jwtdecode(req.cookies.token).email})
    
    missingItemReports.find({author: currentUser._id}, (err, missingItemReports) => {
        res.render('missingItemReportsHistory', {
            missingItemList : missingItemReports
        })
    })
    
}

module.exports = {
    getViolationReportsHistory,
    getMissingItemsReportsHistory
}