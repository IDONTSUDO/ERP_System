// эта колекция будет хранить айди, девайсов юзера. Куда буду слать пуш уведомления.

const mongoose = require('mongoose');

const DevisesSchema = new mongoose.Schema({
    userBy: {
        type: String
    },
    device_info: {
        type: Array
    },
    date_inizialization: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Devises", DevisesSchema)
