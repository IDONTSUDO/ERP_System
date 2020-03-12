const mongoose = require('mongoose')
const UserOneStatistic = new mongoose.Schema({
    user_created_todo: {//юзеров всего
        type: Number,
        default: 0
    },
    user_todo: {//создано задач
        type: Number,
        default: 0
    },
    complete_todo_user: {//завершено задач
        type: Number,
        default: 0
    },
    complete_deal: {//заключеных сделок
        type: Number,
        default: 0
    },
    Seil_user: {//сделок  всего
        type: Number,
        default: 0
    },
    differenceSeil_user: { //продаж не закрыто
        type: Number,
        default: 0
    },
    Userby:{
        type: String
    },
    day:{
        type:Object
    }
})
module.exports = mongoose.model("UserOneStatistic", UserOneStatistic)
