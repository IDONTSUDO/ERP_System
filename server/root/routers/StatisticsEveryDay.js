const express = require("express")
const {
    GetAllStatistic,
    UpdateStatisticTodoComplete,
    NewStatistic
} = require("../controllers/StatisticsEveryDay")
const {jwtTokenUserId,requireSignin} = require("../middleware/middleware.js")
const router = express.Router({mergeParams: true});


router.post('/update/days/statistics/todo/complete',UpdateStatisticTodoComplete)
router.post('/update/days/statistics/todo/assign',UpdateStatisticTodoComplete)
router.post('/update/days/statistics/comment/result',UpdateStatisticTodoComplete)

router.post('/new/statistic/everyday',jwtTokenUserId,NewStatistic)
router.get('/all/statistics',requireSignin,GetAllStatistic)



module.exports = router