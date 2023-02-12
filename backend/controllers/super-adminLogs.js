const admin = require("../models/adminUsers");
const violationsModel = require('../models/violationReports')
const missingModel = require('../models/missingItemReports')
const jwtdecode = require("jwt-decode");
const logs = require('../models/logs')


const getLogsPage = async (req, res) => {
  try {
    const currentUser = await admin.findOne({
      email: jwtdecode(req.cookies.token).email,
    });
    
    
    violationsModel.countDocuments((err, count) =>{
      let violationCount = count
      missingModel.count((err, count) =>{
        let missingCount = count
        violationsModel.countDocuments({status: 'Pending'}, (err, count) =>{
          let violationPending = count
          violationsModel.countDocuments({status: 'Solved'}, (err, count) =>{
            let violationSolved = count
            violationsModel.countDocuments({status: 'Overdue'}, (err, count) =>{
              let violationOverdue = count
              missingModel.countDocuments({status: 'Pending'}, (err, count) =>{
                let missingPending = count
                missingModel.countDocuments({status: 'Solved'}, (err, count) =>{
                  let missingSolved = count
                  missingModel.countDocuments({status: 'Overdue'}, (err, count) =>{
                    let missingOverdue = count
                    admin.find({ _id: currentUser._id }, (err, admin) => {
                      logs.find((err, data) => {
                        res.render("logs", {
                          violationCount,
                          violationPending,
                          violationSolved,
                          violationOverdue,
                          missingCount,
                          missingPending,
                          missingSolved,
                          missingOverdue,
                          logs: data
  
                        });
                      })
                      
                    });

                  })
                })
              })
            })
          })
        })

      })
    })
    
    
  } catch (error) {
    console.log(error);
    //res.redirect('/logout')
  }
}

module.exports = {
  getLogsPage
};
