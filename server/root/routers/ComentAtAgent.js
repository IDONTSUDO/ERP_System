// /new/comment/at/agent/spec
const express = require("express")
const { 
    newCommentAtAgent
 } = require("../controllers/AtAgentComment.js")
const {jwtTokenUserId} = require("../middleware/middleware.js")



const router = express.Router({mergeParams: true});


router.post('/new/comment/at/agent/spec',newCommentAtAgent )



module.exports = router