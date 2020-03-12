const mongoose = require('mongoose')
const EmailSnipetSchema = new mongoose.Schema({
    disign: {
        type: Object,
    },
    name:{
        type:String
    },
    dateCreated:{
        type:Date
    },
    html:{
        type:Object
    }
})
module.exports = mongoose.model("EmailSnipet", EmailSnipetSchema)