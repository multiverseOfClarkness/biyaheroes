const path = require('path')
const MissingItemReport = require('../models/missingItemReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')


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
    const author = findUser
    
    try {
        const evidence = await JSON.parse(body.evidence)
        const missingItemReports = new MissingItemReport({
            bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription, complainant, evidence: new Buffer.from(evidence.data, 'base64'),evidenceType: evidence.type, author
        });
        await missingItemReports.save();
        res.redirect('/commuter/history/missing-item')
    } catch (error) {
        console.log(error.message)
        if(error.message === 'Unexpected end of JSON input'){
            const missingItemReports = new MissingItemReport({
                bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription, complainant, author 
            })
            await missingItemReports.save()
            res.redirect('/commuter/history/missing-item')
    }
    
    
}
}


module.exports = {
    getReportMissingPage,
    reportMissingItem
}
