const violationReports = require('../models/violationReports')
const userModel = require('../models/users')


const getComplaintsPage = (req, res) => {
  violationReports.find({}, (err, violationReports) => {      
    res.render('super-admin-complaints', {
        violationList: violationReports
    })
  })  
}

const getIndividualComplaint = (req, res) => {
  const violationAuthor = req.body.violationAuthor
  const userArray = []
  
  userModel.find((err, result) => {
    result.forEach(data => {
      userArray.push(data.id)
    })
  })

  userModel.findOne({id: violationAuthor}, (err, result) => {

    const authFname = result.fname
    const authLname = result.lname

    violationReports.find({_id: req.params.id}, (err, violationReports) => {
      res.render('SA-complaint-individual-report', {
          violationList : violationReports,
          userArray,
          authFname, authLname
      })
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
