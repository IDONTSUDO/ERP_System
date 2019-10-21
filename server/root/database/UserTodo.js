const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const todoSchema =  new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String,
        default: "в работе"
    },
    created:{
        type: Date,
        default: Date.now
    },
    time:{
        type: String,
    },
    timeComand:{
        type:Array
    },
    JobArray:{
        type:Array
    },
    tags:[{
        type:Object
    }],
    postedBy:{
        type: ObjectId,
        ref:  "User"
    },
    expireAt: {
        type: Date,
        index: { expires: '5m' },
    },
    importance:{
        type:String
    },
    comand:{
        type:Boolean
    }
})
module.exports = mongoose.model("TODO", todoSchema)
