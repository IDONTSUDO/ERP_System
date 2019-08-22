const mongoose = require("mongoose")
const uuidv1 = require("uuid/v1")
const crypto = require("crypto")
const { ObjectId } = mongoose.Schema;

const workerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    postedBy:{
        type: ObjectId,
        ref:  "User"
    },
});
module.exports = mongoose.model("Worker", workerSchema)