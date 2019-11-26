const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  body: {
    type: String,

  },
  name: {
    type: String,
  },
  worker: {
    type: String,
    ref: "User"
  },
  todoId: {
    type: String,
    ref: "TodoId"
  },
  created: {
    type: Date,
    default: Date.now
  },
  createdAt: { type: Date, expires: '262800m', default: Date.now }
})
module.exports = mongoose.model("Coment", commentSchema)
