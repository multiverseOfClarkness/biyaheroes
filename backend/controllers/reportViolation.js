const path = require('path')
const ViolationReport = require('../models/violationReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const { populate } = require('../models/violationReports')
const { JsonWebTokenError } = require('jsonwebtoken')
const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']



const getReportViolationPage = (req,res) => {
    res.render('report-violation')
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
    const author = findUser

    try {
        const evidence = await JSON.parse(body.evidence)
        const violationReports = new ViolationReport({
            bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription, complainant, 
            evidence: new Buffer.from(evidence.data, 'base64'),
            evidenceType: evidence.type,
            author 
        })
        
        await violationReports.save()
        res.render('report-violation-success')

    } catch (error) {
        console.log(error.message)
        if(error.message === 'Unexpected end of JSON input'){
            const violationReports = new ViolationReport({
                bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription, complainant, author 
            })
            
            await violationReports.save()
            res.render('report-violation-success')
        }
    }
    
    
    
}


module.exports = {
    getReportViolationPage,
    submitViolationReport
}

