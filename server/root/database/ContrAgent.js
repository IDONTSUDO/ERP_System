const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const contrAgentSchema = new mongoose.Schema({
  // физ. лицо/юр. лицо/ИП
  company: {
    type: String,
    default: "none"
  },

  // Подразделения (филиалы) и их местонахождения:
  branches: {
    type: ObjectId
  },
  // Компании относящиеся к данному контрагенту (партнеры):
  partners: {
    type: Array
  },
  //  Какая техника, станки, производство:
  production: {
    type: Array
  },
  site: {
    type: String
  },
  Instagram: {
    type: String
  },
  // Должность, ФИО, контакты (телефон, почта). Комментарий с описанием особенности работы с данным человеком
  Contact_faces:{
    type:ObjectId
  },

  Getting_started_with:{
      type:String
  },
  
  full_name: {
    type: String,
    default: "none"
  },
  name: {
    type: String,
    default: "none"
  },
  UUID: {
    type: String,
    default: "none"
  },
  phone: {
    type: String,
    default: "none"
  },
  status: {
    type: String,
    default: "none"
  },
  // ИНН/КПП
  INN: {
    type: String,
    default: "none"
  },
  general_director: {
    type: String,
    default: "none"
  },
  OGRN: {
    type: String,
    default: "none"
  },
  email: {
    type: String,
    default: "none"
  },
  // Подразделения (филиалы) и их местонахождения:
  agentGeo: {
    type: Array,
    default: "none"
  },
  Date: {
    type: Date,
    default: Date.now
  },
  region: {
    //регион РФ
    type: String,
    default: "none"
  },
  specialications: {
    //специализация
    type: Array,
    default: "none"
  },
  TechAgent: {
    //техника
    type: Array,
    default: "none"
  },
  tags: {
    type: Object,
    default: "none"
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  // любая другая полезная информация
  any: {
    type: String,
    default: "none"
  },
  // юр адрес
  legal_address: {
    type: String,
    default: "none"
  },
  // актуальный адрес
  actual_address: {
    type: String,
    default: "none"
  },
  // платежные данные
  payment_account: {
    type: String,
    default: "none"
  },
  // пометки особенности
  tagging_features: {
    type: String
  },
  company_desription:{
    type:String
  },
  active: { type: Boolean, default: true },
  WhereFromClient: {type:String},
  work_begin_with_him:{type:String},
  individual_conditions_job:{type:String},
  pay_character:{type:String},
  Human:{
    type:ObjectId
  },
  Office:{
    type:ObjectId
  }
});
module.exports = mongoose.model("Agent", contrAgentSchema);





