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
const {requireSignin} = require("../middleware/middleware.js")

router.get('/agent/list',requireSignin, AllAgent )
router.get('/agent/:agentId',requireSignin,  getAgentProfile)

router.post('/agent/search',requireSignin, SearchAgent )
router.post('/new/agent/:workerById',requireSignin, NewAgent)
router.post('/agent/manage/',requireSignin, getMyListAgent)
router.post('/new/manage/agent/:agentId',requireSignin, ManageAddAgent)


router.delete('/delete/manage/agent/:workerById',requireSignin, DeleteManagerForAgent)
router.put('/change/agent/:agentId',requireSignin,  ChangeAgent)


router.param('workerById',workerById)
router.param('agentId', agentId)
module.exports = router
