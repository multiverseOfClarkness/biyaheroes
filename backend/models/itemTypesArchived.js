const mongoose = require('mongoose')

const itemSchema = mongoose.Schema ({
    item: {
        type: String,
        required: [true, "Item name is required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"]
    }

}) 

module.exports = mongoose.model('itemArchived', itemSchema, 'itemArchived')