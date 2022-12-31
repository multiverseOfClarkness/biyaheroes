const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname : {
        type: String,
        required: [true, 'Firstname is required.']
    },
    lname : {
        type: String,
        required: [true, 'Lastname is required.']
    },
    birthday : {
        type: Date,
        required: [true, 'Birthday is required.']
    },
    address : {
        type: String,
        required: [true, 'Address is required.']
    },
    phone : {
        type: String,
        required: [true, 'Phone number is required.']
    },
    email : {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email already used.']
    },
    verifiedpass : {
        type: String,
        required: [true, 'Password is required.']
    },
    reports : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'violationReports'
    }
})


//validates unique email
userSchema.path('email').validate(async (email) => {
    const recordCount = await mongoose.models.User.countDocuments({email})
    return !recordCount
}, 'Email already exists')

 const user = mongoose.model('user', userSchema, 'user')
 module.exports = user
