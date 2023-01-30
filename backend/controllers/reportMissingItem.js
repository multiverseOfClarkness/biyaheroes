const path = require('path')
const MissingItemReport = require('../models/missingItemReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const getReportMissingPage = (req,res) => {
    res.render('report-missing')
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
        
        missingItemReports.save((err, report) => {
            const justReported = report.id
            client.messages
            .create({
                body: `Thanks for reaching out! Your report number is: ${justReported}. Please wait for our response regarding this.  `,
                from: '+15732847492',
                to: '+639925776610'
            })
            .then(message => console.log(message));
        });
        
        res.render('report-missing-success')
    } catch (error) {
        console.log(error.message)
        if(error.message === 'Unexpected end of JSON input'){
            const missingItemReports = new MissingItemReport({
                bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription, complainant, author 
            })
            
            missingItemReports.save((err, report) => {
                const justReported = report.id
                client.messages
                .create({
                    body: `Thanks for reaching out! Your report number is: ${justReported}. Please wait for our response regarding this.  `,
                    from: '+15732847492',
                    to: '+639925776610'
                })
                .then(message => console.log(message));
                });
           
            res.render('report-missing-success')
    }
    
    
}
}


module.exports = {
    getReportMissingPage,
    reportMissingItem
}
