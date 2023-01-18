const mongoose = require('mongoose')

const todaSchema = mongoose.Schema({
    presidentName: {
        type: String,
        required: [true, 'President name is required']
    },
    TODA: {
        type: String,
        required: [true, 'TODA name is required']
    }
    
})

module.exports = mongoose.model('toda', todaSchema, 'toda')