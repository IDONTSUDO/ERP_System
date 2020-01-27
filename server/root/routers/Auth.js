const express = require("express")
const { 
    signup,
    signin,
    securityWrite,
    securityFind,
    MySecurity
 } = require("../controllers/Auth")
const {jwtTokenUserId} = require("../middleware/middleware.js")
const {DeleteDeviceByDuringExit} = require("../controllers/push")
const {NewSession}= require("../controllers/redis.js")


const router = express.Router({mergeParams: true});

router.get('/signout',jwtTokenUserId, DeleteDeviceByDuringExit)

router.post('/signup', signup)
router.post('/signin',  signin,NewSession, securityFind ,securityWrite)
router.post('/user/security',MySecurity )



module.exports = router
