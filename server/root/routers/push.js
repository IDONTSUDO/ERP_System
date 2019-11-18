const express = require("express")
const { PushUsers,UserFindPushData } = require("../controllers/push.js")

const router = express.Router({ mergeParams: true });

router.post('/push/user/',PushUsers)
router.post('/user/find/device/push',UserFindPushData)

module.exports = router
