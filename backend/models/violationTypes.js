const mongoose = require('mongoose')

const violationTypeSchema = mongoose.Schema ({
    violation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Continuing',
        required: [true, "Status is required"]
    }
}) 

module.exports = mongoose.model('violationTypes', violationTypeSchema, 'violationTypes')