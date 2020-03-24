const mongoose = require("mongoose");
const CompanyPostsSchema = new mongoose.Schema({
  posts_name: {
    type: String
  }
});
module.exports = mongoose.model("Posts_company", CompanyPostsSchema);
