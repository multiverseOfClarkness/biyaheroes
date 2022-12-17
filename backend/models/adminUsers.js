const mongoose = require('mongoose')

const userSchema = mongoose.Schema ({
    role : {
        type: String,
        required: true
    },
    fullname : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Admin', userSchema, 'admin')