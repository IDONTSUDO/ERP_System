const mongoose = require('mongoose');
// эта колекция будет хранить данные о подключениях юзера
const { ObjectId } = mongoose.Schema
const SecuritySchema = new mongoose.Schema({
  UserBy:{ // кому принадлежит
    type:ObjectId 
  },
  user_security_data:{
    type:String
  },// User Agent
  user_ip:{
    type:String
  },// ip 
  date:{
    type:Date,
    default:Date.now()
  },
  createdAt: { type: Date, expires: '129600m', default: Date.now }
})

module.exports = mongoose.model("Security", SecuritySchema)
