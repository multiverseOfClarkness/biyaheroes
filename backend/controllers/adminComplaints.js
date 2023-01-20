const violationReports = require('../models/violationReports')

const getComplaintsPage = (req, res) =>{
    violationReports.countDocuments({}, (err, count) =>{
        res.render('admin-complaints', {
            count
        })
    })
    
}

const getViolationReportsHistory = (req,res) => {
    
    violationReports.find({status: 'Pending'}, (err, violationReports) => {
        res.render('complaints-pending', {
            violationList : violationReports
        })
    })
    
}

const getIndividualPendingComplaintReport = async(req, res) => {
    violationReports.find({_id: req.params.id}, (err, violationReports) => {
        res.render('complaint-pending-report', {
            violationList : violationReports
        })
    })


      
}


module.exports = {
    getComplaintsPage,
    getViolationReportsHistory,
    getIndividualPendingComplaintReport


}