const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
// Cars Node
const TechNodesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    tech:[{
        type:ObjectId,ref:"NodesProperty"
    }]
})
module.exports = mongoose.model("TechNodes", TechNodesSchema)