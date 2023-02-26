const mongoose = require('mongoose')

const violationTypeSchema = mongoose.Schema ({
    violation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: [true, "Status is required"]
    }
}) 

module.exports = mongoose.model('violationTypesArchived', violationTypeSchema, 'violationTypesArchived')