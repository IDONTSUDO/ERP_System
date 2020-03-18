const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const moment = require("moment")
const agentTasksSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    user:{
        type:Object
    },
    status: {
        type: String,
        default: "в работе"
    },
    agentByTodo:{
        type:Array
    },
    diff:{
        type:Array
    },
    mounth:{
        type:String
    },
    year:{
        type:String
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
    rate:{
        type:Number
    },
    day:{
        type:String,
        default: moment(new Date(Date.now())).format('DD') 
    }
})

module.exports = mongoose.model("AgentTask", agentTasksSchema)
