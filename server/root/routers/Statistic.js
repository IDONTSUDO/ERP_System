const express = require("express")
const { NewUserQuality,DeleteUserQuality,GetUserQuality,NewStatisticTabel } = require("../controllers/Statistic")

const router = express.Router({mergeParams: true});
NewStatisticTabel
router.post('/new/qauality/user/statistic',NewUserQuality )
router.post('/new/tabel/',NewStatisticTabel)


router.delete('/delete/qauality/user/statistic',DeleteUserQuality)

router.get('/get/qauality/user/statistic', GetUserQuality)



module.exports = router
