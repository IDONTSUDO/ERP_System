const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const agentHistorycomentSchema =  new mongoose.Schema({
    body: {
        type: String,
    },
    name:{
        type:String,
    },
    workerId:{
        type: String,
        ref:  "User"
    },
    agentID:{
        type: String,
        ref:  "TodoId"
    },
    created: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("ComentAgent", agentHistorycomentSchema)