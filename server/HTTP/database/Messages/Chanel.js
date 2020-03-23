const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ChanelSchema = new mongoose.Schema({
  users: [{ type: ObjectId, ref: "User" }],
  name: {
    type: String
  }
});

module.exports = mongoose.model("Chanel", ChanelSchema);
