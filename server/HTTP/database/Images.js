const mongoose = require('mongoose')
const ImagesMailSchema = new mongoose.Schema({
    path: {
        type: String,
    },
    filename: {
        type: String,
    },
    originalname: {
        type: String,
        ref: "User"
    }
})
module.exports = mongoose.model("ImageMail", ImagesMailSchema)