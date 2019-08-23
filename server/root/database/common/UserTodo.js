const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const todoSchema =  new mongoose.Schema({
    titel:{
        type: String,
    },
    body:{
        type: String,
    },
    photo:{
        data:Buffer,
        contenType: String
    },
    status:{
        type: String,
        default: "в работе"
    },
    created:{
        type: Date,
        default: Date.now
    },
    user_accountability:[{
        type: ObjectId,
        ref:"User"
    }],
    postedBy:{
        type: ObjectId,
        ref:  "User"
    }
})
module.exports = mongoose.model("TODO", todoSchema)
