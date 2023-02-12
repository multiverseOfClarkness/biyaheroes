const mongoose = require('mongoose')

const itemSchema = mongoose.Schema ({
    item: {
        type: String,
        required: [true, "Item name is required"]
    }, 
    status: {
        type: String,
        default: 'Continuing',
        required: [true, "Status is required"]
    }

}) 

module.exports = mongoose.model('items', itemSchema, 'items')