const mongoose = require('mongoose')
const ManagePricedAtAgentSchema = new mongoose.Schema({
    userBy: {
        type: String
    },
    price: {
        type: Number,
        default:0
    }
})
module.exports = mongoose.model("ManagePriced", ManagePricedAtAgentSchema)
