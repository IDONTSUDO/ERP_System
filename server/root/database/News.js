const mongoose = require('mongoose');
 
 
const NewsSchema = new mongoose.Schema({
  event: {
    type: String,
  },
  tags:[{
    type:Object
  }],
  worker_by:{
    type:String 
  },
  link:{
    type:String
  },    
  description: {
    type: String,
  },
  dateCreated:{
    type:Date,
    default:Date.now()
  }
})
module.exports = mongoose.model("News", NewsSchema)
