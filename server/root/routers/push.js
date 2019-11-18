const express = require("express")
const { PushUsers,UserFindPushData,UserAddPushData } = require("../controllers/push.js")

const router = express.Router({ mergeParams: true });

router.post('/push/user/',PushUsers)
router.post('/user/find/device/push',UserFindPushData)
router.post("/user/data/push", UserAddPushData)
module.exports = router
