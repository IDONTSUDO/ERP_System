const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const UserActiveWeekSchema = new mongoose.Schema({
    year:{
        type:String
    },
    week:{
        type:String
    },
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
    value:{
        type:Number,
        default: 0
    },
    name:{
        type:String
    },
    userId:{
        type:ObjectId
    }
})
module.exports = mongoose.model("UserActiveWeek", UserActiveWeekSchema)