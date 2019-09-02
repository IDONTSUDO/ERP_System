const mongoose = require("mongoose")
const uuidv1 = require("uuid/v1")
const crypto = require("crypto")
const { ObjectId } = mongoose.Schema;

const workerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nam:{
        type:String,
        require:true
    },
    surname:{
        type: String,
        required: true
    },
    patronymic:{
        type: String,
        required: true
    },
    Date_of_Birth:{
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    role: {
        type: String,
        required: true
    },
    phone:{
        type: String,
    },
    news:[{ type: Array, ref: "Новости" }],
    by_appointment_TODO:[{ type: ObjectId, ref: "Задача со стороны" }],
    agent_list:[{ type: ObjectId, ref: "my agent" }],
    January:{
        type:Number
    },
    February:{
        type:Number
    },
    March:{
        type:Number
    },
    April:{
        type:Number
    },
    May:{
        type:Number
    },
    June:{
        type:Number
    },
    July:{
        type:Number
    },
    August:{
        type:Number
    },
    September:{
        type:Number
    },
    October:{
        type:Number
    },
    November:{
        type:Number
    },
    December:{
        type:Number
    }
});

workerSchema
    .virtual("password")
    .set(function(password) {

        this._password = password;

        this.salt = uuidv1();

        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    });


workerSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) {
        if (!password) return ""
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        } catch (err) {
            return ""
        }
    }
};

module.exports = mongoose.model("Worker", workerSchema)