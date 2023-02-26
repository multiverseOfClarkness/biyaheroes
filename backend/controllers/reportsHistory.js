const violationReports = require('../models/violationReports')
const missingItemReports = require('../models/missingItemReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const { find } = require('../models/users')

const getViolationReportsHistory = async (req,res) => {
    const currentUser = await users.findOne({email: jwtdecode(req.cookies.token).email})
    
    violationReports.find({"author._id": currentUser._id}, (err, violationReports) => {
        res.render('violationReportsHistory', {
            violationList : violationReports
        })  
    })
    
}
const getMissingItemsReportsHistory = async (req,res) => {
    const currentUser = await users.findOne({email: jwtdecode(req.cookies.token).email})
    
    missingItemReports.find({"author._id": currentUser._id}, (err, missingItemReports) => {
        res.render('missingItemReportsHistory', {
            missingItemList : missingItemReports
        })
    })
    
}

module.exports = {
    getViolationReportsHistory,
    getMissingItemsReportsHistory
}

