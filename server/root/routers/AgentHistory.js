const express = require("express")
const {
    NewHistory,
    NewComent,
    changeHistory,
    HistoryById,
    myHistoryActive,
    myHistoryBeginer,
    myHistoryComplete,
    GetHistoryOne } = require("../controllers/AgentHistory.js")
const {workerSelectId} = require("../controllers/Company")
const router = express.Router({mergeParams: true});


router.get('/history/:HistoryById', GetHistoryOne)
router.post('/new/history/:workerById', NewHistory)
router.post('/new/comment/',  NewComent)


router.put('/change/history/:HistoryById',  changeHistory)
router.post('/my/history/active/', myHistoryActive)
router.post('/my/history/beginer/', myHistoryBeginer)
router.post('/my/history/complete/', myHistoryComplete)
router.param('HistoryById',HistoryById)
router.param('workerById',workerSelectId)
module.exports = router