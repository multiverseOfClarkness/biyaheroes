const missingItemReports = require('../models/missingItemReports')
const userModel = require('../models/users')
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");
const admin = require("../models/adminUsers");



const getMissingItemPage = (req, res) =>{
    missingItemReports.find({}, (err, data) => {
            res.render('super-admin-missing', {
                missingList: data,
            })
    }) 
}

const getIndividualMissingReport = async(req, res) => {
    const missingAuthor = req.body.missingAuthor
    const userArray = []
    
    userModel.find((err, result) => {
        result.forEach(data => {
        userArray.push(data.id)
        })
    })

    userModel.findOne({id: missingAuthor}, (err, result) => {

        const authFname = result.fname
        const authLname = result.lname

    missingItemReports.find({_id: req.params.id}, (err, missingItemReports) => {
        res.render('SA-missing-individual-report', {
            missingReportData : missingItemReports,
            userArray,
            authFname, authLname
        })
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
        section: 'Super admin/ missing',
        action: 'Updated report status.',
        userID: `${currentUser.id}`
      })
    res.redirect('/SA/missing')

}

module.exports = {
    getMissingItemPage,
    getIndividualMissingReport,
    updateIndividualPendingMissingReport
}