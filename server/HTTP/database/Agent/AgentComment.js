const mongoose = require('mongoose')
const agentHistorycomentSchema = new mongoose.Schema({
    body: {
        type: String,
    },
    name: {
        type: String,
    },
    workerId: {
        type: String,
        ref: "User"
    },
    agentID: {
        type: String,
        ref: "TodoId"
    },
    rate:{
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("ComentAgent", agentHistorycomentSchema)