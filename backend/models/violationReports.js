const mongoose = require('mongoose')
const { default: mongooseAutoPopulate } = require('mongoose-autopopulate')
const { castObject, schema } = require('./users')
const Schema = mongoose.Schema


const violationReportsSchema = new Schema({
    bodyNum : {
        type: String,
        required: [true, 'Body number is required']
    },
    driverName : {
        type: String
    },
    TODA : {
        type: String,
        required: [true, 'TODA is required']
    },
    driverDescription : {
        type: String,
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
    evidence : [Buffer],
    evidenceType: {
        type: String
    },
    author: {
        type: Object
    },
    status: {
        type: String,
        default: 'Pending'
    }
    
}, {timestamps: true}) 

violationReportsSchema.virtual('evidenceImagePath').get(function(){
    if(this.evidence != null){
        return `data:${this.evidenceType};charset=utf-8;base64,${this.evidence[0].toString('base64')}`
    }
})
violationReportsSchema.virtual('evidenceImagePathArray').get(function(){
    if(this.evidence != null){
        const array = []
        const vv = this.evidence
        
        vv.forEach(element => {
            array.push(`data:${this.evidenceType};charset=utf-8;base64,${element.toString('base64')}`)
        })
        return array
    }
})



const violationReports = mongoose.model('violationReports', violationReportsSchema, 'violationReports')
module.exports = violationReports
 