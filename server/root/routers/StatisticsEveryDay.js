const express = require("express")
const {
    GetAllStatistic,
    UpdateStatisticTodoComplete,
    NewStatistic,
    UpdateStatisticTodoAssign,
    UpdateStatisticCommentResult
} = require("../controllers/StatisticsEveryDay")
const {jwtTokenUserId,requireSignin} = require("../middleware/middleware.js")
const router = express.Router({mergeParams: true});


router.post('/update/days/statistics/todo/complete',UpdateStatisticTodoComplete)
router.post('/update/days/statistics/todo/assign',UpdateStatisticTodoAssign)
router.post('/update/days/statistics/comment/result',UpdateStatisticCommentResult)
router.post('/new/statistic/everyday',jwtTokenUserId,NewStatistic)
router.post('/all/statistics',requireSignin,GetAllStatistic)



module.exports = router