const express = require("express")

const {
    GetPriceByManage,
    NewPriceAtAgent,
    DeletePriceAtManageToAgent
    } = require("../controllers/Priced")
const router = express.Router({ mergeParams: true });

router.post('/agent/user/price', GetPriceByManage)
router.post('/new/agent/price/at/manage',NewPriceAtAgent)


router.delete('/manage/delete/price/at/manage', DeletePriceAtManageToAgent)

module.exports = router
