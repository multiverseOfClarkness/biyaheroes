const mongoose = require("mongoose");

const todaSchema = mongoose.Schema({
  presidentName: {
    type: String,
    required: [true, "President name is required"],
    unique: [true, "Already exists"],
  },
  TODA: {
    type: String,
    required: [true, "TODA name is required"],
    unique: [true, "Already exists"],
  },
});

module.exports = mongoose.model("toda", todaSchema, "toda");
