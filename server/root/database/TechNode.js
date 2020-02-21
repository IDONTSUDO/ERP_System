const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const TechNodeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    tech:{
        type:ObjectId
    }
})
module.exports = mongoose.model("TechNode", TechNodeSchema)