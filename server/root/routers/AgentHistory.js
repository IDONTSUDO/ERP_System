const express = require("express")
const { NewHistory,NewComent,changeHistory,HistoryById,myHistoryActive,myHistoryBeginer } = require("../controllers/AgentHistory.js")
const {workerSelectId} = require("../controllers/Company")
const router = express.Router({mergeParams: true});


router.post('/new/history/:workerById', NewHistory)
router.post('/new/comment/',  NewComent)
router.put('/change/history/:HistoryById',  changeHistory)
router.post('/my/history/active/:workerById', myHistoryActive)
router.post('/my/history/beginer/:workerById', myHistoryBeginer)
router.param('HistoryById',HistoryById)
router.param('workerById',workerSelectId)
module.exports = router