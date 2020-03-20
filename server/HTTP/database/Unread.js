const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const UnreadSchema = new mongoose.Schema({
  user: { type: ObjectId },
  sum: {
    type: String
  }
});
module.exports = mongoose.model("Unread", UnreadSchema);
