const mongoose = require("mongoose");
let {Schema} = mongoose
const CompanyStructSchema = new mongoose.Schema({
  structures: {
    type: String
  }
});
module.exports = mongoose.model("Structures", CompanyStructSchema);
