const mongoose = require('mongoose')
const Schema = mongoose.Schema

const violationReportsSchema = new Schema({
    bodyNum : {
        type: String,
        required: true
    },
    driverName : {
        type: String,
        required: true
    },
    TODA : {
        type: String,
        required: true
    },
    driverDescription : {
        type: String,
        required: true
    },
    violation : {
        type: String,
        required: true
    },
    dateOfIncident : {
        type: String,
        required: true
    },
    incidentDescription : {
        type: String,
        required: true
    },
    complainant : {
        type: String,
        required: true
    },
    evidence : {
        type: Buffer
    }
}, {timestamps: true}) 

module.exports = mongoose.model('violationReports', violationReportsSchema, 'violationReports')