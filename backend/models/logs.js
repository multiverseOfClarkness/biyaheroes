const mongoose = require('mongoose')

const logsSchema = mongoose.Schema({
    author : {
        type: String,
        required: true,
    },
    section : {
        type: String,
        required: true,
    },
    action : {
        type: String,
        required: true,
    },
    userID : {
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('logs', logsSchema, 'logs')