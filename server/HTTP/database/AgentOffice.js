const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const AgentOfficeSchema = new mongoose.Schema({
  branch_office: { type: String },
  officeGeo: { type: Array },
  AgentBy:{type:ObjectId}
});
module.exports = mongoose.model("AgentOffice", AgentOfficeSchema);
