const mongoose = require('mongoose')

const violationReportsSchema = mongoose.Schema({
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
    driverDesciption : {
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
    incidentDesciption : {
        type: String,
        required: true
    },
    complainant : {
        type: String,
        required: true
    },
    evidence : {
        name: String,
        desc: String,
        img: {
            data: Buffer,
            contentType: String
        }
    }
}) 

module.exports = mongoose.model('Violation_Reports', violationReportsSchema, 'violation_reports')