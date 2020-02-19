const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const contrAgentSchema = new mongoose.Schema({
    company: {
        type: String,
        default:"none"
    },
    full_name: {
        type: String,
        default:"none"
    },
    name: {
        type: String,
        default:"none"
    },
    UUID: {
        type:String,
        default:"none"
    },
    phone: {
        type: String,
        default:"none"
    },
    status: {
        type: String,
        default:"none"
    },
    INN: {
        type: String,
        default:"none"
    },
    general_director: {
        type: String,
        default:"none"
    },
    OGRN: {
        type: String,
        default:"none"
    },
    email: {
        type: String,
        default:"none"
    },
    agentGeo:{
        type:Array,
        default:"none"
    },
    Date: {
        type: Date,
        default: Date.now
    },
    region:{//регион РФ
        type:String,
        default:"none"
    },
    specialications:{ //специализация
        type:Array,
        default:"none"
    },
    tech:{ //техника 
        type:Array,
        default:"none"
    },
    tags: {
        type: Object,
        default:"none"
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    any: {
        type: String,
        default:"none"
    },
    legal_address: {
        type: String,
        default:"none"
    },
    actual_address: {
        type: String,
        default:"none"
    },
    payment_account: {
        type: String,
        default:"none"
    },
    active:{type:Boolean,default:true}
})
module.exports = mongoose.model("Agent", contrAgentSchema)
