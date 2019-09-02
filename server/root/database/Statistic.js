const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const WorkerStatisticSchema =  new mongoose.Schema({
    worker_quality:{
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model("WorkerStatistic", WorkerStatisticSchema)
