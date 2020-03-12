const mongoose = require('mongoose')
const ChanelSchema = new mongoose.Schema({
    User:{
        type:Array
    },
    Name:{
        type:String
    }
})
ChanelSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Chanel", ChanelSchema)