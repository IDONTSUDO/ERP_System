const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema
const SecuritySchema = new mongoose.Schema({
  yearTo:{ 
    type:String 
  }
})

module.exports = mongoose.model("Security", SecuritySchema)