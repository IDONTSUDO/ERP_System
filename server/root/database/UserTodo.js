const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String
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
        index: { expires: '5m' },
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
    }
})

module.exports = mongoose.model("TODO", todoSchema)
