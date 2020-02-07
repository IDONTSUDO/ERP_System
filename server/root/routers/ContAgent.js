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
    NewAgent,
    AgentStates,
    SearchAgentEmail,
    TodoAgentFind,
    TodoAgentQuality,
    GetYearStatisticAgent,
    GetYearAndMountStatistichAgent } = require("../controllers/ContrAgent")
const { workerById } = require("../controllers/Company")
const {requireSignin} = require("../middleware/middleware.js")

const router = express.Router({mergeParams: true});


router.get('/agent/list',requireSignin, AllAgent )
router.get('/agent/:agentId',requireSignin,  getAgentProfile)
router.get('/agent/todo/:agentId',TodoAgentFind)
router.get('/agent/todo/quality/:agentId',TodoAgentQuality)

router.post('/agent/search',requireSignin, SearchAgent )
router.post('/new/agent/:workerById',requireSignin, NewAgent)
router.post('/agent/manage/',requireSignin, getMyListAgent)
router.post('/new/manage/agent/:agentId',requireSignin, ManageAddAgent)
router.post('/get/contragent/date',AgentStates);
router.post('/search/managing/director/to/email',SearchAgentEmail)
router.post('/year/agent/todo/statistics',GetYearStatisticAgent)
router.post('/year/on/mounth/todo/agent/todo',GetYearAndMountStatistichAgent)

router.delete('/delete/manage/agent/:workerById',requireSignin, DeleteManagerForAgent)


router.put('/change/agent/:agentId',requireSignin,  ChangeAgent)

router.param('workerById',workerById)
router.param('agentId', agentId)


module.exports = router
