const missingItemReports = require('../models/missingItemReports')

const getMissingItemPage = (req, res) => { 
    missingItemReports.countDocuments({}, (err, count) =>{
        res.render('admin-missing', {
            count
        })
    })
    
}

const getMissingReportsHistory = (req,res) => {
    
    missingItemReports.find({}, (err, missingItemReports) => {
        res.render('missing-pending', {
            missingReportsList : missingItemReports
        })
    })
    
}

const getIndividualPendingMissingReport = async(req, res) => {
    missingItemReports.find({_id: req.params.id}, (err, missingItemReports) => {
        res.render('missing-pending-report', {
            missingReportData : missingItemReports
        })
    })


      
}

module.exports = {
    getMissingItemPage,
    getMissingReportsHistory,
    getIndividualPendingMissingReport
}