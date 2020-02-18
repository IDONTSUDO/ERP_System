const mongoose = require('mongoose')

const TechCollectionSchema = new mongoose.Schema({
    name: {
        type: String
    }
})
module.exports = mongoose.model("TechCollection`", TechCollectionSchema)