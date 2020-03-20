const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const OnlineSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  name: {
    type: String
  },
  io_id: { type: String, require: true }
});

module.exports = mongoose.model("Online", OnlineSchema);
