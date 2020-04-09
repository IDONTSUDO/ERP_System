const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const AgentOfficeSchema = new mongoose.Schema({
  name: { type: String },
  AgentBy: { type: ObjectId },
  sity: { type: Array },
  region: { type: Array },
  number_phone:{ type: String },
  adress:{type:String}
});

module.exports = mongoose.model("AgentOffice", AgentOfficeSchema);
