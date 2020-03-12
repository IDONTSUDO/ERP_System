const mongoose = require("mongoose");
const AgentHumanSchema = new mongoose.Schema({
  position: { type: String },
  features_job: { type: String },
  bio: { type: String },
  phoneAt_peopel: { type: String },
  mail_at_peopel: { type: String },
  checkedList: { type: Array }
});
module.exports = mongoose.model("AgentHuman", AgentHumanSchema);
