const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const AgentHistorySchema = new mongoose.Schema({
    Date: {
        type: Date,
        default: Date.now
    },
    agentByid: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
    },
    name: {
        type: String,
    },
    postedBy: {
        type: String
    },
    comment: {
        type: String
    },
    item: {
        type: String
    },
    rate: {
        type: Number
    }
})
module.exports = mongoose.model("AgentHistory", AgentHistorySchema)