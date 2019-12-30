const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
   text:{
    type: String
   },
   userBy:{
    type: String
   },
   read:{
      type:Boolean,
      default:false
   },
   DialogId:{
    type: String
   }
})
module.exports = mongoose.model("Message", MessageSchema)