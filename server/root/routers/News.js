const express = require("express")
const { newNews,readNews,NewsKills,NewsId,NewsSetDateDelete} = require("../controllers/News")
const {requireSignin} = require("../middleware/middleware.js")
const router = express.Router({mergeParams: true});

router.post('/worker/news', requireSignin,readNews)
router.post('/worker/read/:newsId',requireSignin,NewsSetDateDelete)
router.post('/new/news', requireSignin, newNews)

router.param('newsId',NewsId)
module.exports = router
