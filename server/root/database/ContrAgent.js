const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const contrAgentSchema =  new mongoose.Schema({
    company:{
        type: String,
        required:true
    },
    full_name:{
        type: String,
        required:true
    },
    //сокращенное название
    name:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    status:{
        type: String,
       
    },
    INN:{
        type: String,
        
    },
    general_director:{
        type: String,
        required:true
    },
    OGRN:{
        type: String,
        required:true
    },
    email:{

    },

    Date:{
        type: Date,
        default:Date.now
    },
    tags:[{
        type:Object
    }],
    AgentHistoryJob:{
        type:ObjectId,
        ref: "История работ"
    },
    postedBy:{
        type: ObjectId,
        ref:  "User"
    }
})
module.exports = mongoose.model("Agent", contrAgentSchema)
