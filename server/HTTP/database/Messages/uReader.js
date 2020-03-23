const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const UnreadSchema = new mongoose.Schema({
  chanel: {
    type: ObjectId
  },
  num: {
    type: Number,
    default: 0
  },
  user: {
    type: String
  }
});
module.exports = mongoose.model("Unreader", UnreadSchema);
