const express = require("express")
const { 
    PushUsers,
    UserFindPushData,
    UserAddPushData,
    MyPushingDevice,
    CheckBrowserForSubscription,
    DeleteDevice } = require("../controllers/push.js")


const router = express.Router({ mergeParams: true });

router.post('/push/user/', CheckBrowserForSubscription, PushUsers)
router.post('/user/find/device/push', UserFindPushData)
router.post('/user/data/push', UserAddPushData)
router.post('/my/device/', MyPushingDevice)
router.post('/delete/device/', DeleteDevice)
module.exports = router
