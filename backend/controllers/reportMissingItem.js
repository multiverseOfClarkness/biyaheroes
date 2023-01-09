const path = require('path')
const MissingItemReport = require('../models/missingItemReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg']

const getReportMissingPage = (req,res) => {
    res.sendFile(path.resolve('./', 'frontend', 'views', 'report-missing-item.html'))
}

const reportMissingItem = async (req, res) => {
    const findUser = await users.findOne({email: jwtdecode(req.cookies.token).email})
    const body = req.body
    const bodyNum = body.bodyNum
    const driverName = body.driverName
    const TODA = body.toda
    const driverDescription = body.driverDesc
    const itemType = body.itemType
    const dateOfIncident = body.date
    const itemDescription = body.itemDescription
    const complainant = body.complainant
    const evidence = body.evidence
    const author = findUser
    
    const missingItemReports = new MissingItemReport({
        bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription, complainant, evidence, author
    });
    saveImageAsBinary(missingItemReports, evidence)
     

    try {
        await missingItemReports.save();
        res.redirect('/commuter/history/missing-item')
    } catch (error) {
        console.log(error.message)
    }
    
    
}

const saveImageAsBinary = async (missingItemReports, evidenceEncoded) => {
    try {
        if (evidenceEncoded === undefined || evidenceEncoded === null) return;

        const evidence = await JSON.parse(evidenceEncoded)

        if (evidence != null && imageMimeTypes.includes(evidence.type)) {
            missingItemReports.evidence = new Buffer.from(evidence.data, 'base64')
    }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getReportMissingPage,
    reportMissingItem
}
