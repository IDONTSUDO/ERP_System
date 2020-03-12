const mongoose = require("mongoose");
const AgentOfficeSchema = new mongoose.Schema({
  branch_office: { type: String },
  officeGeo: { type: Array }
});
module.exports = mongoose.model("AgentOffice", AgentOfficeSchema);
