const express = require("express")
const { signup,signin,signout,securityWrite,securityFind,MySecurity } = require("../controllers/Auth")

const router = express.Router({mergeParams: true});

router.post('/signup', signup)
router.post('/signin',  signin, securityFind ,securityWrite)
router.post('/user/security',MySecurity )
router.get('/signout',  signout)


module.exports = router
