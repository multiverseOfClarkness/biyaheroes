const violationReports = require('../models/violationReports')


const getComplaintsPage = (req, res) => {
  violationReports.find({}, (err, violationReports) => {      
    res.render('super-admin-complaints', {
        violationList: violationReports
    })
  })  
}

const getIndividualComplaint = (req, res) => {
  violationReports.find({_id: req.params.id}, (err, violationReports) => {
    res.render('SA-complaint-individual-report', {
        violationList : violationReports
    })
  }) 
}

const updateIndividualComplaints = async (req, res) => {
  await violationReports.findOneAndUpdate({_id: req.params.id}, {status: "Solved"}, {
    new: true
    });
    res.redirect('/SA/complaints')
}




module.exports = {
  getComplaintsPage,
  getIndividualComplaint,
  updateIndividualComplaints
};
