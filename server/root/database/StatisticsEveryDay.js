const mongoose = require('mongoose')
const StatisticsEveryDayAllSchema = new mongoose.Schema({
    todo_complete: {
        type: Number,
        default: 0
    },
    comment:{
        type: Number,
        default: 0
    },
    assigned_todo:{
        type: Number,
        default: 0
    },
    day: {
        type: String,
    },
    userBy:{
        type:String
    },
    createdAt: { type: Date, expires: '1500m', default: Date.now }
})
module.exports = mongoose.model("StatisticsEveryDay", StatisticsEveryDayAllSchema)