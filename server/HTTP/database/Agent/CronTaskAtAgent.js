const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const CrontTasksSchema = new mongoose.Schema({
    PlanningDate: {
        type: String
        // moment date
    },
    UserId: {
        type: Array
        // userObjectId
    },
    agentId: {
        type: ObjectId,
        //agentId 
    },
    agent:{
        type:Object
        // agentSchem
    }
})

module.exports = mongoose.model("CronTaskAtAgent", CrontTasksSchema)
