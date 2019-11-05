const mongoose = require("mongoose")
const uuidv1 = require("uuid/v1")
const crypto = require("crypto")
const { ObjectId } = mongoose.Schema;

const workerSchema = new mongoose.Schema({
    name: { //@params Имя 
        type: String,
        required: true
    },
    Date_of_Birth: { //@params дата рождения
        type: String,
    },
    email: { //@params емэил
        type: String,
        required: true
    },
    hashed_password: { //@params хэш пароля
        type: String,
        required: true
    },
    salt: String, //@params соль пороля
    created: { //@params когда создан
        type: Date, 
        default: Date.now
    },
    updated: Date,//@params дата когда он последний раз производил, изменения в профиле
    photo: { //@params
        data: Buffer,
        contentType: String
    },
    role: { //@params роль юзера в системе
        type: String,
        required: true
    },
    phone: {//@params номер телефона
        type: String,
    },
    avatar:{//@params вообще нужно реакт слишком быстр, и типо по этому значения смотрю нужно ли делать запрос. Костыль больших масштабов. Но делать нечего.
        type:Boolean, 
        default:false
    },
    todo_avesome:{//@params
        type:String,
        default:"#f72d2dc9"
    },
    todo_middle:{//@params
        type:String,
        default:"#fff30fc0"
    },
    todo_not_very_important:{ //@params отвечает за цвета на фронте.
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
    }//отвечает за первую авторизацию сначала создается как false, при авторизации оно меняется на true. Нужно для безопасности.

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


