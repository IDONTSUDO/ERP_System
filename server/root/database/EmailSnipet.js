const mongoose = require('mongoose')
const EmailSnipetSchema = new mongoose.Schema({
    disign: {
        type: Object,
    },
    name:{
        type:String
    }
})
module.exports = mongoose.model("EmailSnipet", EmailSnipetSchema)