const mongoose = require('mongoose')
const PriceManageAtAgentSchema = new mongoose.Schema({
    AgentBy: {
        type: String
    },
    UserBy: {
        type: Object
    },
    price: {
        type: Number
    }
})
module.exports = mongoose.model("PriceManageAtAgent", PriceManageAtAgentSchema)
