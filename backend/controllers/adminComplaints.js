const violationReports = require('../models/violationReports')
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");
const admin = require('../models/adminUsers')

const getComplaintsPage = (req, res) =>{
    violationReports.find({}, (err, violationReports) => {      
            res.render('admin-complaints', {
                violationList: violationReports
            })
    })  
}


const getIndividualComplaintReport = async(req, res) => {
    violationReports.find({_id: req.params.id}, (err, violationReports) => {
        res.render('complaint-individual-report', {
            violationList : violationReports
        })
    }) 
}


const updateIndividualPendingComplaintReport = async (req, res) =>{
    await violationReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {new: true});
    const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
    });
    logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Admin / complaints',
        action: 'Updated status of pending report.',
        userID: `${currentUser.id}`
    })
    res.redirect('/admin/complaints')

}

module.exports = {
    getComplaintsPage,
    getIndividualComplaintReport,
    updateIndividualPendingComplaintReport
}