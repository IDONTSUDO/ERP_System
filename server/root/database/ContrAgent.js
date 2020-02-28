const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const contrAgentSchema = new mongoose.Schema({
    // физ. лицо/юр. лицо/ИП
    company: {
        type: String,
        default:"none"
    },

    // Подразделения (филиалы) и их местонахождения:
    branches:{
        type:Object
    },
    // Компании относящиеся к данному контрагенту (партнеры):
    partners:{
        type:Array
    },
    //  Какая техника, станки, производство:
    production:{
        type:Array
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
    // ИНН/КПП
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
    // Подразделения (филиалы) и их местонахождения:
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
    TechAgent:{ //техника 
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
    // любая другая полезная информация
    any: {
        type: String,
        default:"none"
    },
    // юр адрес
    legal_address: {
        type: String,
        default:"none"
    },
    // актуальный адрес
    actual_address: {
        type: String,
        default:"none"
    },
    // платежные данные
    payment_account: {
        type: String,
        default:"none"
    },
    // пометки особенности
    tagging_features:{
        type:String
    },

    active:{type:Boolean,default:true}
})
module.exports = mongoose.model("Agent", contrAgentSchema)
