const missingItemReports = require('../models/missingItemReports')
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");
const admin = require('../models/adminUsers')

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
    const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
    });
    await missingItemReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {
    new: true
    });

    logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Admin / missing item reports',
        action: 'Updated status of a report.',
        userID: `${currentUser.id}`
    })
    res.redirect('/admin/missing')

}

module.exports = {
    getMissingItemPage,
    getIndividualMissingReport,
    updateIndividualPendingMissingReport
}