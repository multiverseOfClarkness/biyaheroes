const missingItemReports = require('../models/missingItemReports')

const getPendingMissingPage = async (req,res) => {
    
    missingItemReports.find({}, (err, missingItemReports) => {
        res.render('missing-pending', {
            missingList : missingItemReports
        })  
    })
    
}

module.exports = {
    getPendingMissingPage
}