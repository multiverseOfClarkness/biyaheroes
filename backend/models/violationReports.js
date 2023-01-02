const mongoose = require('mongoose')
const Schema = mongoose.Schema


const violationReportsSchema = new Schema({
    bodyNum : {
        type: String,
        required: [true, 'Body number is required']
    },
    driverName : {
        type: String,
        required: [true, 'Driver name is required']
    },
    TODA : {
        type: String,
        required: [true, 'TODA is required']
    },
    driverDescription : {
        type: String,
        required: [true, 'Driver description is required']
    },
    violation : {
        type: String,
        required: [true, 'Violation type is required']
    },
    dateOfIncident : {
        type: String,
        required: [true, 'Date of incident is required']
    },
    incidentDescription : {
        type: String,
        required: [true, 'Additional description about the incident is required']
    },
    complainant : {
        type: String,
        required: [true, 'Identity of complainant is required']
    },
    evidence : {
        type: Buffer
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true}) 


const violationReports = mongoose.model('violationReports', violationReportsSchema, 'violationReports')
module.exports = violationReports
 