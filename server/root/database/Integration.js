const mongoose = require('mongoose')
const ItegrationSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    userBy: {
        type: Object,
    }
})
module.exports = mongoose.model("ItegrationDate", ItegrationSchema)