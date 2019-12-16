const mongoose = require('mongoose')
const agentHistorycomentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type:String
    },
    phone:{

    },
    AgentBy: {
        type: String,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("ComentAgent", agentHistorycomentSchema)