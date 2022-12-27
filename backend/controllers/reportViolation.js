const path = require('path')
const { encode } = require('punycode')
const ViolationReport = require('../models/violationReports')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const getReportViolationPage = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'report-violation.html'))
}

const submitViolationReport = async (req, res) => {
    try {
        const body = await req.body

        let newReport = new ViolationReport({
            body_number: body.bodyNum,
            driver_name: body.driverName,
            TODA: body.toda,
            driver_description: body.driverDesc,
            date: body.date,
            incident_description: body.incidentDesc,
            complainant: body.complainant,
            evidence: body.evidence
        })
        await ViolationReport.save()
        res.redirect('/commuter/reportsHistory')
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(400).json({
                message: "An error has occured. Please try again.",
            });
        }
    }
    
   
}

// const saveEvidence (img, encodedImage ) =>{
//     if (encodedImage == null) return
//     const image =  JSON.parse(encodedImage)
//     if (image != null && imageMimeTypes.includes(image.type)) {
//         img.evidence = new Buffer.from(image.data, 'base64')
//     }
// }   

module.exports = {
    getReportViolationPage,
    submitViolationReport
}

