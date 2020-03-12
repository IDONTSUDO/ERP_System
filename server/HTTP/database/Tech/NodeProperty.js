const mongoose = require('mongoose')

// Node property

const NodesPropertySchema = new mongoose.Schema({
    name: {
        type: String
    }
})
module.exports = mongoose.model("NodesProperty", NodesPropertySchema)