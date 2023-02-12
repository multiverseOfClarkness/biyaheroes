const mongoose = require('mongoose')
const Schema = mongoose.Schema


const missingItemReportsSchema = new Schema({
    bodyNum : {
        type: String,
        required: [true, 'Body number is required']
    },
    driverName : {
        type: String,
    },
    TODA : {
        type: String,
        required: [true, 'TODA is required']
    },
    driverDescription : {
        type: String,
    },
    itemType : {
        type: String,
        required: [true, 'Violation type is required']
    },
    dateOfIncident : {
        type: String,
        required: [true, 'Date of incident is required']
    },
    itemDescription : {
        type: String,
        required: [true, 'Additional description about the incident is required']
    },
    evidence : [Buffer],
    evidenceType : {
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

missingItemReportsSchema.virtual('evidenceImagePath').get(function(){
    if(this.evidence != null && this.evidenceType != null){
        return `data:${this.evidenceType};charset=utf-8;base64,${this.evidence.toString('base64')}`
    }
})
missingItemReportsSchema.virtual('evidenceImagePathArray').get(function(){
    if(this.evidence != null){
        const array = []
        const vv = this.evidence
        
        vv.forEach(element => {
            array.push(`data:${this.evidenceType};charset=utf-8;base64,${element.toString('base64')}`)
        })
        return array
    }
})


const missingItemReports = mongoose.model('missingItemReports', missingItemReportsSchema, 'missingItemReports')
module.exports = missingItemReports
 