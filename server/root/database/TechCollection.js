const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const TechCollectionSchema = new mongoose.Schema({
    name: {
        type: String
    }
})
module.exports = mongoose.model("TechCollection`", TechCollectionSchema)    