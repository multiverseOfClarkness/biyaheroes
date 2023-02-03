const missingItemReports = require('../models/missingItemReports')

const getMissingItemPage = (req, res) =>{
    missingItemReports.find({}, (err, data) => {
            res.render('admin-missing', {
                missingList: data,
            })
    }) 
}

const getIndividualMissingReport = async(req, res) => {
    missingItemReports.find({_id: req.params.id}, (err, missingItemReports) => {
        res.render('missing-individual-report', {
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
    getIndividualMissingReport,
    updateIndividualPendingMissingReport
}