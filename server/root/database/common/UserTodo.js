const mongoose = require("mongoose")
const moment = require("moment")

const { ObjectId } = mongoose.Schema
const UserTodoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dateCreate:{
        type: moment().format('YYYY [escaped] YYYY')
    },
    dateLast:{
        type: Date,
    },
    user_accountability:[{
        type: ObjectId,
        ref:"User"
    }],
    postedBy:{
        type: ObjectId,
        ref:  "User"
    },
    message:[{ObjectId,ref: Message}]
});
module.exports = mongoose.model("UserTODO", UserTodoSchema)