const mongoose = require("mongoose");
const OblastSchema = new mongoose.Schema({
  oblast: {
    type: String
  }
});
module.exports = mongoose.model("RussiaOblast", OblastSchema);
