const violationReports = require('../models/violationReports')

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
    await violationReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {
    new: true
    });
    res.redirect('/admin/complaints')

}

module.exports = {
    getComplaintsPage,
    getIndividualComplaintReport,
    updateIndividualPendingComplaintReport
}