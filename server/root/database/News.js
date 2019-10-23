const mongoose = require('mongoose');
 
 
const NewsSchema = new mongoose.Schema({
  event: {
    type: String,
  },
  worker_by:{
    type:String 
  },
  posted_by:{
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
  },  
  expireAt: {
    type: Date,
    index: { expires: '5m' },
  }
})
module.exports = mongoose.model("News", NewsSchema)
