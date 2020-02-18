const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const TechSpecSchema = new mongoose.Schema({
    name: {
        type: String
    }
})
module.exports = mongoose.model("TechSpec`", TechSpecSchema)