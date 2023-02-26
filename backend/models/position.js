const mongoose = require("mongoose");

const todaSchema = mongoose.Schema({
  position: {
    type: String,
    required: [true, "Position entry is required"],
    unique: [true, "Position already exists"],
  },
});

module.exports = mongoose.model("toda", todaSchema, "toda");
