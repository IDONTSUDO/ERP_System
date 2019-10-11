const express = require("express")
const {
    NewHistory,
    NewComent,
    changeHistory,
    HistoryById,
    myHistoryActive,
    myHistoryBeginer,
    myHistoryComplete,
    GetHistoryOne,
    AllAgentHistotory } = require("../controllers/AgentHistory.js")
const {workerSelectId} = require("../controllers/Company.js")
const router = express.Router({mergeParams: true});

router.get('/history/:HistoryById', GetHistoryOne)

router.post('/new/history/', NewHistory)
router.post('/new/comment/',  NewComent)
router.post('/all/agent/history/',  AllAgentHistotory)
router.post('/my/history/active/', myHistoryActive)
router.post('/my/history/beginer/', myHistoryBeginer)
router.post('/my/history/complete/', myHistoryComplete)


router.put('/change/history/:HistoryById',  changeHistory)

router.param('HistoryById',HistoryById)
router.param('workerById',workerSelectId)
module.exports = router