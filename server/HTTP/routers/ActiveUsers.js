const express = require("express")
const { 
    newCommentAtAgent,
    agentUpdateStatistic,
    userActive,
    userActiveMouthAndYear,
    activeHelper,
    newTodoByAgent,
    userActiveAtAgentGet
 } = require("../controllers/AtAgentComment.js")
const {jwtTokenUserId} = require("../middleware/middleware.js")



const router = express.Router({mergeParams: true});


router.post('/new/comment/at/agent/spec',newCommentAtAgent,newTodoByAgent,agentUpdateStatistic )
router.post('/user/active/',userActive)
router.post('/active/helper/get/week',activeHelper)
router.post('/get/week/active',userActiveMouthAndYear)
router.post('/active/user/helper',userActiveAtAgentGet)
module.exports = router