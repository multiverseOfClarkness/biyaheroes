const missingItemReports = require('../models/missingItemReports')

const getMissingItemPage = (req, res) =>{
    missingItemReports.countDocuments({status: "Pending"}, (err, count) => {
        missingItemReports.countDocuments({status: "Solved"}, (err, count1) =>{
            res.render('admin-missing', {
                count,
                count1
            })
        })
        
    }) 
}

const getPendingMissingReportsHistory = (req,res) => {
    
    missingItemReports.find({status: "Pending"}, (err, missingItemReports) => {
        res.render('missing-pending', {
            missingReportsList : missingItemReports
        })
    })
    
}
const getSolvedMissingReportsHistory = (req,res) => {
    
    missingItemReports.find({status: "Solved"}, (err, missingItemReports) => {
        res.render('missing-solved', {
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
const getIndividualSolvedMissingReport = async(req, res) => {
    missingItemReports.find({_id: req.params.id}, (err, missingItemReports) => {
        res.render('missing-solved-report', {
            missingReportData : missingItemReports
        })
    })  
}

const updateIndividualPendingMissingReport = async (req, res) =>{
    await missingItemReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {
    new: true
    });
    res.redirect('/admin/missing')

}

module.exports = {
    getMissingItemPage,
    getPendingMissingReportsHistory,
    getSolvedMissingReportsHistory,
    getIndividualPendingMissingReport,
    getIndividualSolvedMissingReport,
    updateIndividualPendingMissingReport
}