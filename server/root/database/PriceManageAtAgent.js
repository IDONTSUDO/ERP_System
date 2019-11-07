const mongoose = require('mongoose')
const PriceManageAtAgentSchema = new mongoose.Schema({
    AgentBy: {
        type: String
    },
    UserBy: {
        type: String
    },
    price: {
        type: String
    }
})
module.exports = mongoose.model("PriceManageAtAgent", PriceManageAtAgentSchema)
