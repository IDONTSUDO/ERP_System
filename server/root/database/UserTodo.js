const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const todoSchema =  new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
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
    tags:[{
        type:Object
    }],
    postedBy:{
        type: ObjectId,
        ref:  "User"
    }
})
module.exports = mongoose.model("TODO", todoSchema)
