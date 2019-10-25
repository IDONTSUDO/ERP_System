const express = require("express")
const {
    NewUserQuality,
    DeleteUserQuality,
    GetUserQuality,
    NewStatisticTabel,
    NewTODOQuality,
    NewCompleteTODOQuality,
    NewCompleteSeil,
    NewCompleteSeilAll,
    NewCompleteSeilDiffence } = require("../controllers/Statistic")
const { requireSignin } = require("../middleware/middleware.js")
const router = express.Router({ mergeParams: true });

router.get('/get/qauality/user/statistic', requireSignin, GetUserQuality)

router.post('/new/qauality/user/', requireSignin, NewUserQuality)
router.post('/new/tabel/', requireSignin, NewStatisticTabel)
router.post('/new/complete/todo/qauality/', requireSignin, NewCompleteTODOQuality)
router.post('/new/complete/seil/difence/', requireSignin, NewCompleteSeilDiffence)
router.post('/new/complete/seil/all/', requireSignin, NewCompleteSeilAll)
router.post('/new/complete/seil/qauality/', requireSignin, NewCompleteSeil)
router.post('/new/todo/qauality/', requireSignin, NewTODOQuality)


router.delete('/delete/qauality/user/statistic', requireSignin, DeleteUserQuality)





module.exports = router
