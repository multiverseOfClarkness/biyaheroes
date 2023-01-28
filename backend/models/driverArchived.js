const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  bodyNum: {
    type: String,
    required: [true, "Body number is required"],
    
  },
  fname: {
    type: String,
    required: [true, "First name is required"],
  },
  lname: {
    type: String,
    required: [true, "Last name is required"],
  },
  TODA: {
    type: String,
    required: [true, "TODA name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  status: {
    type: String,
    default: 'Continuing',
    required: [true, "Phone is required"],
  }
});

module.exports = mongoose.model("driverArchived", driverSchema, "driverArchived");
