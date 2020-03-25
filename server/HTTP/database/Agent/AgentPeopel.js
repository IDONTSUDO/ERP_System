const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const AgentHumanSchema = new mongoose.Schema({
  position: { type: String },
  features_job: { type: String },
  bio: { type: String },
  phoneAt_peopel: { type: String },
  mail_at_peopel: { type: String },
  checkedList: { type: Array },
  AgentBy: { type: ObjectId },
  number:{ type: String}
  
});
module.exports = mongoose.model("AgentHuman", AgentHumanSchema);
