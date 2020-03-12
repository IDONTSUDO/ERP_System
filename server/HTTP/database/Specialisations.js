const mongoose = require('mongoose');

const SpecialicationsSchema = new mongoose.Schema({

  data:{
    type:String
  }
})

module.exports = mongoose.model("Specialication", SpecialicationsSchema)
