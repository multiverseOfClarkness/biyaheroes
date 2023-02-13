const path = require('path')
const MissingItemReport = require('../models/missingItemReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const nodemailer = require('nodemailer');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const nodeCron = require('node-cron')
const todaModel = require('../models/toda')
const itemModel = require('../models/itemTypes')

const getReportMissingPage = (req,res) => {
    todaModel.find({}, (err, data) => {
        itemModel.find({}, (err, result) => {
            res.render('report-missing', {
                todaList : data,
                itemList: result
            })
        })
    })
    
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
    const author = findUser
    
    try {
        let evidence = body.evidence

        if(!Array.isArray(evidence)){
            let evidence = JSON.parse(body.evidence)
            const missingItemReports = new MissingItemReport({
                bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription,
                evidence: new Buffer.from(evidence.data, 'base64'),
                evidenceType: evidence.type,
                author 
            })
            
            missingItemReports.save((err, report) =>{
                const justReported = report.id
                const reporter = findUser.email
    
                //Logic for updating report status to overdue.
                nodeCron.schedule('0 0 0 */3 * *', async () => {
                    await MissingItemReport.findById(justReported, async (err, resultA) => {
                        await console.log(`Before: ${resultA.id} ${resultA.status}`)
                        
                        if(resultA.status == 'Pending'){
                            MissingItemReport.updateOne(resultA, {status: "Overdue"}, {new: true}, (err, result)=>{
                                
                            });
                            
                        }; 
                        
                    })
                })
                
                //SMS Notification
                client.messages
                .create({
                    body: `Thanks for reaching out! Your report number is: ${justReported}. Please wait for our response regarding this.  `,
                    from: '+17124235120',
                    to: '+639215125385'
                })
                .then(message => console.log(message.body));
                
                //Email notification
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'biyaheroesconnect@gmail.com',
                      pass: 'eehntnjcdbowbdko'
                    }
                    });
                const mailOptions = {
                from: 'biyaheroesconnect@gmail.com',
                to: reporter ,
                subject: 'BiyaHeroes report.',
                text: `Thanks for reaching out. Your report number is ${justReported}. Please wait for our response regarding this.`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error.message);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });
                
            })
             
            
            todaModel.find({}, (err, data) => {
                itemModel.find({}, (err, result) => {
                    res.render('report-missing-success', {
                        todaList : data,
                        itemList: result
                    })
                })
            })
        } 

        const v = []
        evidence.forEach(element => {
            const w = JSON.parse(element)
            v.push(new Buffer.from(w.data, 'base64'))
        });
        // const x = Buffer.concat(v)
        const missingItemReports = new MissingItemReport({
            bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription,
            evidence: v,
            evidenceType: v.type,
            author 
        })
        
        missingItemReports.save((err, report) =>{
            
            const justReported = report.id
            const reporter = findUser.email

            //Logic for updating report status to overdue.
            nodeCron.schedule('0 0 0 */3 * *', async () => {
                await MissingItemReport.findById(justReported, async (err, resultA) => {
                    await console.log(`Before: ${resultA.id} ${resultA.status}`)
                    
                    if(resultA.status == 'Pending'){
                        MissingItemReport.updateOne(resultA, {status: "Overdue"}, {new: true}, (err, result)=>{
                            
                        });
                        
                    }; 
                    
                })
            })
            
            //SMS Notification
            client.messages
            .create({
                body: `Thanks for reaching out! Your report number is: ${justReported}. Please wait for our response regarding this.  `,
                from: '+17124235120',
                to: '+639215125385'
            })
            .then(message => console.log(message.body));
            
            //Email notification
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'biyaheroesconnect@gmail.com',
                  pass: 'eehntnjcdbowbdko'
                }
                });
            const mailOptions = {
            from: 'biyaheroesconnect@gmail.com',
            to: reporter ,
            subject: 'BiyaHeroes report.',
            text: `Thanks for reaching out. Your report number is ${justReported}. Please wait for our response regarding this.`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error.message);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
            
        })
         
        todaModel.find({}, (err, data) => {
            itemModel.find({}, (err, result) => {
                res.render('report-missing-success', {
                    todaList : data,
                    itemList: result
                })
            })
        })




       
    } catch (error) {
        console.log(error.message)
        if(error.message === 'Unexpected end of JSON input'){
            const missingItemReports = new MissingItemReport({
                bodyNum, driverName, TODA, driverDescription, itemType, dateOfIncident, itemDescription, complainant, author 
            })
            
            missingItemReports.save((err, report) => {
                const justReported = report.id
                const reporter = findUser.email

                //Logic for updating report status to overdue.
                nodeCron.schedule('0 0 0 */3 * *', async () => {
                    await MissingItemReport.findById(justReported, async (err, resultA) => {
                        await console.log(`Before: ${resultA.id} ${resultA.status}`)
                        
                        if(resultA.status == 'Pending'){
                            MissingItemReport.updateOne(resultA, {status: "Overdue"}, {new: true}, (err, result)=>{
                                
                            });
                            
                        }; 
                        
                    })
                })
                
                //SMS Notif
                client.messages
                .create({
                    body: `Thanks for reaching out! Your report number is: ${justReported}. Please wait for our response regarding this.  `,
                    from: '+17124235120',
                    to: '+639215125385'
                })
                .then(message => console.log(message.body));

                //Email notification
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'biyaheroesconnect@gmail.com',
                      pass: 'eehntnjcdbowbdko'
                    }
                    });
                  
                const mailOptions = {
                    from: 'biyaheroesconnect@gmail.com',
                    to: reporter ,
                    subject: 'BiyaHeroes report.',
                    text: `Thanks for reaching out. Your report number is ${justReported}. Please wait for our response regarding this.`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error.message);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });
                });
           
                todaModel.find({}, (err, data) => {
                    itemModel.find({}, (err, result) => {
                        res.render('report-missing-success', {
                            todaList : data,
                            itemList: result
                        })
                    })
                })
    }
    
    
}
}


module.exports = {
    getReportMissingPage,
    reportMissingItem
}
