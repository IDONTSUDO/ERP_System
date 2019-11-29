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
const {requireSignin} = require("../middleware/middleware.js")



const router = express.Router({mergeParams: true});

        


router.get('/history/:HistoryById', requireSignin,GetHistoryOne)

router.post('/new/history/',requireSignin, NewHistory)
router.post('/new/comment/', requireSignin, NewComent)
router.post('/all/agent/history/',requireSignin,  AllAgentHistotory)
router.post('/my/history/active/',requireSignin, myHistoryActive)
router.post('/my/history/beginer/',requireSignin, myHistoryBeginer)
router.post('/my/history/complete/',requireSignin, myHistoryComplete)


router.put('/change/history/:HistoryById',requireSignin,  changeHistory)

router.param('HistoryById',HistoryById)
router.param('workerById',workerSelectId)
module.exports = router