const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const TechSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type_tech:{
        type:ObjectId
    }
})
module.exports = mongoose.model("Tech`", TechSchema)