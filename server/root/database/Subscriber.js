const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
    userBy: String,
    endpoint: String,
    keys: Schema.Types.Mixed,
    UserAgent:{
        type:String
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('subscribers', SubscriberSchema, 'subscribers');

