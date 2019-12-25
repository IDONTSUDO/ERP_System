const mongoose = require('mongoose');

const socketSchema = new mongoose.Schema({
    userBy: {
        type: String
    },
})

module.exports = mongoose.model("SocketUser", socketSchema)
