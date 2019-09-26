const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const contrAgentSchema =  new mongoose.Schema({
    company:{
        type: String,
        // required:true
    },
    full_name:{
        type: String,
        // required:true
    },
    name:{
        type: String,
        // required:true
    },
    phone:{
        type: String,
        // required:true
    },
    status:{
        type: String,
       
    },
    INN:{
        type: String,
        
    },
    general_director:{
        type: String,
        // required:true
    },
    OGRN:{
        type: String,
        // required:true
    },
    email:{
        type: String,
        // required:true
    },

    Date:{
        type: Date,
        default:Date.now
    },
    tags:[{
        type:Object
    }],
    postedBy:{
        type: ObjectId,
        ref:  "User"
    },
    any:{
        type:String
    },
    legal_address:{
        type: String
    },
    actual_address:{
        type: String
    },
    payment_account:{
        type: String
    },
    redirectTo:false
})
module.exports = mongoose.model("Agent", contrAgentSchema)
