const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const contrAgentSchema = new mongoose.Schema({
    company: {
        type: String,
    },
    full_name: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
    },
    INN: {
        type: String,
    },
    general_director: {
        type: String,
    },
    OGRN: {
        type: String,
    },
    email: {
        type: String,
    },

    Date: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: Object
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    any: {
        type: String
    },
    legal_address: {
        type: String
    },
    actual_address: {
        type: String
    },
    payment_account: {
        type: String
    }
})
module.exports = mongoose.model("Agent", contrAgentSchema)
