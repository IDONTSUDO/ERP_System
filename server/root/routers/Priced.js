const express = require("express")

const {GetPriceByManage} = require("../controllers/Priced")
const router = express.Router({ mergeParams: true });

router.post('/agent/user/price', GetPriceByManage)


module.exports = router
