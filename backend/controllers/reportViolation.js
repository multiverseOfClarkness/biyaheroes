const path = require('path')
const ViolationReport = require('../models/violationReports')

const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']



const getReportViolationPage = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'report-violation.html'))
}

const submitViolationReport = async (req, res) => {
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


    const violationReports = new ViolationReport({
        bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription, complainant, evidence
    });
    saveImageAsBinary(violationReports, evidence)

    try {
        const newReport = await violationReports.save();
        res.redirect('/commuter/reportsHistory')
    } catch (error) {
        console.log(error.message)
    }
    
    
}

const saveImageAsBinary = (violationReports, evidenceEncoded) => {
    try {
        if (evidenceEncoded === undefined) return;

        const evidence = JSON.parse(evidenceEncoded)

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

