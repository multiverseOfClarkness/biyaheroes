const path = require('path')
const ViolationReport = require('../models/violationReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const { populate } = require('../models/violationReports')
const { JsonWebTokenError } = require('jsonwebtoken')
const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']



const getReportViolationPage = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'report-violation.html'))
}

const submitViolationReport = async (req, res) => {
    const findUser = await users.findOne({email: jwtdecode(req.cookies.token).email})
    const body = req.body
    
    const bodyNum = body.bodyNum
    const driverName = body.driverName
    const TODA = body.toda
    const driverDescription = body.driverDesc
    const violation = body.violation
    const dateOfIncident = body.date
    const incidentDescription = body.incidentDesc
    const complainant = body.complainant
    const evidence = body.evidence
    const author = findUser
    
    
    
    const violationReports = new ViolationReport({
        bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription, complainant, evidence, author 
    });
    saveImageAsBinary(violationReports, evidence)
    

    try {
    
        await violationReports.save()
        res.redirect('/commuter/history/violation')
            
    } catch (error) {
        console.log(error.message)
    }
    
    
}

const saveImageAsBinary = async (violationReports, evidenceEncoded) => {
    try {
        if (evidenceEncoded === undefined || evidenceEncoded === null) return;

        const evidence = await JSON.parse(evidenceEncoded)

        if (evidence != null && imageMimeTypes.includes(evidence.type)) {
            violationReports.evidence = new Buffer.from(evidence.data, 'base64')
    }
    } catch (error) {
        console.log(error)
    }
}


  

module.exports = {
    getReportViolationPage,
    submitViolationReport
}

