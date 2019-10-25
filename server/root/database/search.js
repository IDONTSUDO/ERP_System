const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
})
module.exports = mongoose.model("Product", productSchema)
