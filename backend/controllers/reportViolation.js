const ViolationReport = require('../models/violationReports')
const users = require('../models/users')
const jwtdecode = require('jwt-decode')
const nodemailer = require('nodemailer');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const nodeCron = require('node-cron')
const vTypes = require('../models/violationTypes')
const todaModel = require('../models/toda')



const getReportViolationPage = (req,res) => {

    todaModel.find({}, (err, result) => {
        vTypes.find({}, (err, data) => {
            res.render('report-violation', {
                violationTypes: data,
                todaList: result
            })
        })
    })
    
    
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
    const author = findUser
    
    try {
        let evidence = body.evidence
        
        if(!Array.isArray(evidence)){
            let evidence = JSON.parse(body.evidence)
            const violationReports = new ViolationReport({
                bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription,
                evidence: new Buffer.from(evidence.data, 'base64'),
                evidenceType: evidence.type,
                author 
            })
            
            violationReports.save((err, report) =>{
                const justReported = report.id
                const reporter = findUser.email
    
                //Logic for updating report status to overdue.
                nodeCron.schedule('0 0 0 */3 * *', async () => {
                    await ViolationReport.findById(justReported, async (err, resultA) => {
                        await console.log(`Before: ${resultA.id} ${resultA.status}`)
                        
                        if(resultA.status == 'Pending'){
                            ViolationReport.updateOne(resultA, {status: "Overdue"}, {new: true}, (err, result)=>{
                                
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
             
            
            todaModel.find({}, (err, result) => {
                vTypes.find({}, (err, data) => {
                    res.render('report-violation-success', {
                        violationTypes: data,
                        todaList: result
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
        const violationReports = new ViolationReport({
            bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription,
            evidence: v,
            evidenceType: v.type,
            author 
        })
        
        violationReports.save((err, report) =>{
            
            const justReported = report.id
            const reporter = findUser.email

            //Logic for updating report status to overdue.
            nodeCron.schedule('0 0 0 */3 * *', async () => {
                await ViolationReport.findById(justReported, async (err, resultA) => {
                    await console.log(`Before: ${resultA.id} ${resultA.status}`)
                    
                    if(resultA.status == 'Pending'){
                        ViolationReport.updateOne(resultA, {status: "Overdue"}, {new: true}, (err, result)=>{
                            
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
         
        
        todaModel.find({}, (err, result) => {
            vTypes.find({}, (err, data) => {
                res.render('report-violation-success', {
                    violationTypes: data,
                    todaList: result
                })
            })
        })
        
        

    } catch (error) {
        
        if(error.message === 'Unexpected end of JSON input'){
            const violationReports = new ViolationReport({
                bodyNum, driverName, TODA, driverDescription, violation, dateOfIncident, incidentDescription, author 
            })
            // await ViolationReport.deleteMany()
            violationReports.save((err, report) => {
                const justReported = report.id
                const reporter = findUser.email

                //Logic for updating report status to overdue.
                nodeCron.schedule('0 0 0 */3 * *', async () => {
                    await ViolationReport.findById(justReported, async (err, resultA) => {
                        await console.log(`Before: ${resultA.id} ${resultA.status}`)
                        
                        if(resultA.status == 'Pending'){
                            ViolationReport.updateOne(resultA, {status: "Overdue"}, {new: true}, (err, result)=>{
                                
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

            
                todaModel.find({}, (err, result) => {
                    vTypes.find({}, (err, data) => {
                        res.render('report-violation-success', {
                            violationTypes: data,
                            todaList: result
                        })
                    })
                })
        } else if (error.message.includes('Unexpected token ,')){
            console.log(error)
        }
    }
    
    
    
}


module.exports = {
    getReportViolationPage,
    submitViolationReport
}

