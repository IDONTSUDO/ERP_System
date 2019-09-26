const express = require("express")
const { 
    agentId,
    getMyListAgent,
    getAgentProfile,
    SearchAgent,
    AllAgent,
    ChangeAgent,
    DeleteManagerForAgent,
    ManageAddAgent,
    NewAgent } = require("../controllers/ContrAgent")
    const { 
        workerById
    } = require("../controllers/Company")
const router = express.Router({mergeParams: true});

// ----------  ---------- // 
router.post('/new/agent/:workerById', NewAgent)
// ----------  ---------- // 
router.post('/new/manage/agent/:agentId', ManageAddAgent)
router.delete('/delete/manage/agent/:workerById', DeleteManagerForAgent)

// ----------  ---------- // 
router.put('/change/agent/:agentId',  ChangeAgent)
// ----------  ---------- // 


router.get('/agent/list', AllAgent )

router.post('/agent/search', SearchAgent )
// ----------  ---------- // 
router.get('/agent/:agentId',  getAgentProfile)
// ----------  ---------- // 
router.post('/agent/manage/', getMyListAgent)

router.param('workerById',workerById)
router.param('agentId', agentId)
module.exports = router
