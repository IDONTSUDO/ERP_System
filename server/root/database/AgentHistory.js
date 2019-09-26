const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const AgentHistorySchema =  new mongoose.Schema({
    Date:{
        type: Date,
        default:Date.now
    },
    agentByid:{
        type: String,
        required:true
    },
    price:{
        type: Number,
    },
    status:{
        type: String,
       
    },
    postedBy:{
        type:String
    },
    commentResult:{
        type: String
    },
    commentAverage:{
        type: String
    },
    commentStart:{
        type: String
    }
})
module.exports = mongoose.model("AgentHistory", AgentHistorySchema)