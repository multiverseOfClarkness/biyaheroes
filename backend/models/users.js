const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname : {
        type: String,
        required: true
    },
    lname : {
        type: String,
        required: true
    },
    birthday : {
        type: Date,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    verifiedpass : {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('User', userSchema, 'user')