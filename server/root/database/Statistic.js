const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const WorkerStatisticSchema = new mongoose.Schema({
    worker_quality: {//юзеров всего
        type: Number,
        default: 0
    },
    create_todo: {//создано задач
        type: Number,
        default: 0
    },
    complete_todo: {//завершено задач
        type: Number,
        default: 0
    },
    CompleteSeil: {//заключеных сделок
        type: Number,
        default: 0
    },
    SeilAll: {//сделок  всего
        type: Number,
        default: 0
    },
    differenceSeil: { //продаж не закрыто
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model("WorkerStatistic", WorkerStatisticSchema)
