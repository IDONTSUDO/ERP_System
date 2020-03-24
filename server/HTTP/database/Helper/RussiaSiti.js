const mongoose = require("mongoose");
const RussiaSitiSchema = new mongoose.Schema({
  city: {
    type: String
  }
});
module.exports = mongoose.model("RussiaSiti", RussiaSitiSchema);
