const mongoose = require("mongoose");

const todaSchema = mongoose.Schema({
  presidentlname: {
    type: String,
    required: [true, "President name is required"],
    unique: [true, "Already exists"],
  },
  presidentfname: {
    type: String,
    required: [true, "President name is required"],
    unique: [true, "Already exists"],
  },
  TODA: {
    type: String,
    required: [true, "TODA name is required"],
    unique: [true, "Already exists"],
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
    unique: [true, "Already exists"],
  },
  status: {
    type: String,
    default: "Continuing"
  }
});

module.exports = mongoose.model("todaArchived", todaSchema, "todaArchived");
