const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  bodyNum: {
    type: String,
    required: [true, "Body number is required"],
    unique: [true, "A driver with this body number already exists."],
  },
  fname: {
    type: String,
    required: [true, "First name is required"],
    unique: [true, "A driver with this name already exists."],
  },
  lname: {
    type: String,
    required: [true, "Last name is required"],
    unique: [true, "A driver with this name already exists."],
  },
  TODA: {
    type: String,
    required: [true, "TODA name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: [true, "A driver with this phone number already exists."],
  },
  status: {
    type: String,
    default: 'Continuing',
    required: [true, "Phone is required"],
  }
});

module.exports = mongoose.model("driverArchived", driverSchema, "driverArchived");
