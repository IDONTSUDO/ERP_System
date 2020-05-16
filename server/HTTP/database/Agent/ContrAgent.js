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
  // сайт 
  site: {
    type: String
  },
  // инстаграм
  Instagram: {
    type: String
  },
  // Должность, ФИО, контакты (телефон, почта). Комментарий с описанием особенности работы с данным человеком
  Contact_faces: {
    type: ObjectId
  },
// как началась работа с ним
  Getting_started_with: {
    type: String
  },
// полное имя
  full_name: {
    type: String,
    default: "none"
  },
  // короткое имя
  name: {
    type: String,
    default: "none"
  },

  // ююайди из 1-Ски
  UUID: {
    type: String,
    default: "none"
  },
  // телефон
  phone: {
    type: String,
    default: "none"
  },
  // статус
  status: {
    type: String,
    default: "none"
  },
  // ИНН/КПП
  INN: {
    type: String,
    default: "none"
  },
  // генеральный директор
  general_director: {
    type: String,
    default: "none"
  },
  // огрн
  OGRN: {
    type: String,
    default: "none"
  },
  // email
  email: {
    type: String,
    default: "none"
  },
  //гео
  agentGeo: {
    type: Array,
    default: "none"
  },
  // дата создания
  Date: {
    type: Date,
    default: Date.now
  },
  // города
  sity: { type: Array, default: "none" },
  region: {
    type: Array,
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
  hill: {
    type: Array,
    default: "none"
  },
  Customer_Submitted:{
    // 5.3. Это переданный (от кого передан) клиент или нет: Клиента добыл сам
    type:String,
    defaul:"none"
  },
  tags: {
    type: Object,
    default: "none"
  },
  city: {
    type: String
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
  company_desription: {
    type: String
  },
  active: { type: Boolean, default: true },
  WhereFromClient: { type: String },
  work_begin_with_him: { type: String },
  individual_conditions_job: { type: String },
  pay_character: { type: String },
  Human: {
    type: ObjectId
  },
  Office: {
    type: ObjectId
  }
});
module.exports = mongoose.model("Agent", contrAgentSchema);
