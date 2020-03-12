const express = require("express")
const { 
    newCommentAtAgent,
    agentUpdateStatistic,
    userActive,
    userActiveMouthAndYear
 } = require("../controllers/AtAgentComment.js")
const {jwtTokenUserId} = require("../middleware/middleware.js")



const router = express.Router({mergeParams: true});


router.post('/new/comment/at/agent/spec',newCommentAtAgent,agentUpdateStatistic )
router.post('/user/active/',userActive)
router.post('/user/active/mounth',userActiveMouthAndYear)

module.exports = router