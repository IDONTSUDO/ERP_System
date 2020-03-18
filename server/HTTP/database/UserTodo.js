const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const moment = require("moment")
const todoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    day:{
        type:String,
        default: moment(new Date(Date.now())).format('DD') 
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: "в работе"
    },
    posted_by_name:{
        type:String
    },
    mounth:{
        type:String
    },
    year:{
        type:String
    },
    agentByTodo:{
        type:Array
    },
    created: {
        type: Date,
        default: Date.now
    },
    diff:{
        type:Array
    },
    time: {
        type: String,
    },
    timeComand: {
        type: Array
    },
    JobArray: {
        type: Array
    },
    tags: [{
        type: Object
    }],
    posted_by: {
        type: ObjectId,
        ref: "User"
    },
    expireAt: {
        type: Date,
        index: { expires: '1m' },
    },
    name_posted:{
        type:String
    },
    importance: {
        type: String
    },
    comand: {
        type: Boolean
    },
    names_workers_list:{
        type:Array
    },
    cronId:{
        type:String
    },
    agent:{
        type:Object
    },
    Date:{
        type:Date
    }
})

module.exports = mongoose.model("TODO", todoSchema)
