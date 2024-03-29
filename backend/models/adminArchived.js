const mongoose = require('mongoose')

const userSchema = mongoose.Schema ({
    role : {
        type: String,
        required: true,
    },
    fname : {
        type: String,
        required: true,
    },
    lname : {
        type: String,
        required: true
    },
    phone : {
        type: String,
    },
    email : {
        type: String,
        required: true,
        
    },
    password : {
        type: String,
        required: true
    },
    profileImage : {
        type: Buffer
    },
    profileImageType : {
        type: String
    },
    status: {
        type: String,
        default: "Continuing"
    }

})

userSchema.virtual('profileImagePath').get(function(){
    if(this.profileImage != null && this.profileImageType != null){
        return `data:${this.profileImageType};charset=utf-8;base64,${this.profileImage.toString('base64')}`
    }
})
module.exports = mongoose.model('adminArchived', userSchema, 'adminArchived')