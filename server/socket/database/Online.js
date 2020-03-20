const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const OnlineSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  name: {
    type: String
  },
  io_id: { type: String, require: true },
  expireAt: {
    type: Date,
    default: Date.now(),
    index: { expires: "1440m" }
    // На всякий случай данные о сокете живут сутки суток с момента создания
  }
});

module.exports = mongoose.model("Online", OnlineSchema);
