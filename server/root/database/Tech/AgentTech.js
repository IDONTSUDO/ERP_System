const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
// Cars
const TechByAgentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    techNode:[{
        type:ObjectId,ref:"TechNodes"
    }]
})
module.exports = mongoose.model("TechByAgent", TechByAgentSchema)