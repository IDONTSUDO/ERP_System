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
  }
})
module.exports = mongoose.model("News", NewsSchema)
