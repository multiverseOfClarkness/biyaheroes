const missingItemReports = require('../models/missingItemReports')

const getMissingItemPage = (req, res) =>{
    missingItemReports.find({}, (err, data) => {
            res.render('super-admin-missing', {
                missingList: data,
            })
    }) 
}

const getIndividualMissingReport = async(req, res) => {
    missingItemReports.find({_id: req.params.id}, (err, missingItemReports) => {
        res.render('SA-missing-individual-report', {
            missingReportData : missingItemReports
        })
    })  
}


const updateIndividualPendingMissingReport = async (req, res) =>{
    await missingItemReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {
    new: true
    });
    res.redirect('/SA/missing')

}

module.exports = {
    getMissingItemPage,
    getIndividualMissingReport,
    updateIndividualPendingMissingReport
}