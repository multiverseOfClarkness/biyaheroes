const mongoose = require("mongoose");

const todaSchema = mongoose.Schema({
  presidentlname: {
    type: String,
    required: [true, "President name is required"],
    
  },
  presidentfname: {
    type: String,
    required: [true, "President name is required"],
    
  },
  TODA: {
    type: String,
    required: [true, "TODA name is required"],
    
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
   
  },
  status: {
    type: String,
    default: "Continuing"
  }
});

module.exports = mongoose.model("todaArchived", todaSchema, "todaArchived");
