const mongoose = require('mongoose')
const MessageListSchema = new mongoose.Schema({
    DialogId:{
        type:String
    },
    User:{
        type:Array
    }
})

module.exports = mongoose.model("MessageList", MessageListSchema)