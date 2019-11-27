const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  name_posted:{
    type:String
  },
  jobNews:{
    type:Array
  },
  time:{
    type:String
  },
  eventNews: {
    type: String,
  },//тип события
  comand:{
  type: Boolean 
  },
  worker_by_solo_task: {
    type: Array
  },
  worker_by: {
    type: Array
  },//кому
  posted_by: {
    type: String
  },//от кого пришло
  link: {
    type: String
  },//линк на событие
  description: {
    type: String,
  },//полезная информация
  dateCreated: {
    type: Date,
    default: Date.now()
  },//дата создания
  date:{
   type:Date 
  },
  expireAt: {
    type: Date,
    index: { expires: '5m' },
  }
})
module.exports = mongoose.model("News", NewsSchema)
