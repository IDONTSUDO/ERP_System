const mongoose = require("mongoose")
const uuidv1 = require("uuid/v1")
const crypto = require("crypto")

const workerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    Date_of_Birth: {
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
    permission: { 
        type:Object
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
    phone: {
        type: String,
    },
    avatar:{
        type:Boolean, 
        default:false
    },
    todo_avesome:{
        type:String,
        default:"#f72d2dc9"
    },
    todo_middle:{
        type:String,
        default:"#fff30fc0"
    },
    todo_not_very_important:{ 
        type:String,
        default:"#15b11ac4"
    },
    todo_avesome_text:{
        type:String,
        default:"#ffffff"
    },
    todo_middle_text:{
        type:String,
        default:"#000000"
    },
    todo_not_very_important_text:{
        type:String,
        default:"#ffffff"
    },
    todo_avesome_shadow:{
        type:String,
        default:"#ec26269d"
    },
    todo_middle_shadow:{
        type:String,
        default:"#fff30f86"
    },
    todo_not_very_important_shadow:{
        type:String,
        default:"#8ed61398"
    },
    logged_in:{
        type:Boolean,
        default:false
    },
    device:{
        type:Array
    },
    DateHistory:{
        type:Object
    }
})

workerSchema
    .virtual("password")
    .set(function (password) {

        this._password = password;

        this.salt = uuidv1();

        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    });


workerSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
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


