const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  name_posted:{
    type:String
  },
  jobNews:{
    type:Array
  },
  descriptionArray: {
    type:Array
  },
  time:{
    type:String
  },
  newsFrom:{
    type:Object
  },
  eventNews: {
    type: String,
  },//тип события
  comand:{
    type: Boolean 
  },
  agent:{
    type:Object
  },
  worker_by_solo_task: {
    type: Array
  },
  NewsTO:{
    type:String
  },
  worker_by: {
    type: Array
  },//кому
  posted_by: {
    type: String
  },//от кого пришло
  link_posted:{
    type:String
  },
  link: {
    type: String
  },//линк на событие
  description: {
    type: String,
  },//полезная информация
  dateCreated: {
    type: Date,
    default: Date.now(),
    index: { expires: '43200m' },
  },//дата создания
  date:{
   type:Date 
  },
  whoAdd:{type:Object},
  expireAt: {
    type: Date,
    index: { expires: '5m' },
  }
})
module.exports = mongoose.model("News", NewsSchema)
