const violationReports = require('../models/violationReports')

const getComplaintsPage = (req, res) =>{
    violationReports.countDocuments({status: "Pending"}, (err, count) => {
        violationReports.countDocuments({status: "Solved"}, (err, count1) =>{
            res.render('admin-complaints', {
                count,
                count1
            })
        })
        
    })
    
    
}

const getPendingViolationReportsHistory = (req,res) => {
    
    violationReports.find({status: 'Pending'}, (err, violationReports) => {
        res.render('complaints-pending', {
            violationList : violationReports
        })
    })
    
}
const getSolvedViolationReportsHistory = (req,res) => {
    
    violationReports.find({status: 'Solved'}, (err, violationReports) => {
        res.render('complaints-solved', {
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
const getIndividualSolvedComplaintReport = async(req, res) => {
    violationReports.find({_id: req.params.id}, (err, violationReports) => {
        res.render('complaint-solved-report', {
            violationList : violationReports
        })
    }) 
}

const updateIndividualPendingComplaintReport = async (req, res) =>{
    await violationReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {
    new: true
    });
    res.redirect('/admin/complaints')

}

module.exports = {
    getComplaintsPage,
    getPendingViolationReportsHistory,
    getSolvedViolationReportsHistory,
    getIndividualPendingComplaintReport,
    getIndividualPendingComplaintReport,
    getIndividualSolvedComplaintReport,
    updateIndividualPendingComplaintReport

}