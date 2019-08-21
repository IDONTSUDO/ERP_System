const express = require("express")
const { signup,signin,signout } = require("../../controllers/direct/auth")

const router = express.Router({mergeParams: true});

router.post('/signup', signup)
router.post('/signin',  signin)
router.get('/signout',  signout)


module.exports = router
