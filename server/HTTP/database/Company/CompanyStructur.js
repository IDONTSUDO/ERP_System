const mongoose = require("mongoose");
let {Schema} = mongoose
const CompanyStructSchema = new mongoose.Schema({
  structures: {
    type: type.Schema.mixed
  }
});
module.exports = mongoose.model("Structures", CompanyStructSchema);
