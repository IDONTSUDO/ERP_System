const express = require("express")
const { signup,signin,signout } = require("../controllers/auth")

const router = express.Router({mergeParams: true});

// ----------  ---------- // 
router.post('/new/agent', signup)
// ----------  ---------- // 
router.post('/new/manage/agent/:workerById', signup)


// ----------  ---------- // 
router.put('/change/agent/:agentId',  signin)
// ----------  ---------- // 


router.get('/agent/list',  signout)
// ----------  ---------- // 
router.get('/agent/:agentId',  signout)
// ----------  ---------- // 
router.get('/agent/manage/:workerById')


// ----------  ---------- // 
router.param('workerById',workerById)
router.param('agentId', agentId)
module.exports = router
