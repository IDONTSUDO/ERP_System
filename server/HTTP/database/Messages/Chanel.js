const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ChanelSchema = new mongoose.Schema({
  users: [{ type: ObjectId, ref: "Message" }],
  name: {
    type: String
  }
});

module.exports = mongoose.model("Chanel", ChanelSchema);
