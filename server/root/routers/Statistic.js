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

const router = express.Router({mergeParams: true});

router.post('/new/qauality/user/',NewUserQuality )
router.post('/new/tabel/',NewStatisticTabel)
router.post('/new/complete/todo/qauality/',NewCompleteTODOQuality)

router.post('/new/complete/seil/difence/',NewCompleteSeilDiffence)
router.post('/new/complete/seil/all/',NewCompleteSeilAll)
router.post('/new/complete/seil/qauality/',NewCompleteSeil)
router.post('/new/todo/qauality/',NewTODOQuality)


router.delete('/delete/qauality/user/statistic',DeleteUserQuality)

router.get('/get/qauality/user/statistic', GetUserQuality)



module.exports = router
