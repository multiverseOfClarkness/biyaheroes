const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  bodyNum: {
    type: String,
    required: [true, "Body number is required"],
    unique: [true, "A driver with this body number already exists."],
  },
  driverName: {
    type: String,
    required: [true, "Driver name is required"],
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
});

module.exports = mongoose.model("driver", driverSchema, "driver");
