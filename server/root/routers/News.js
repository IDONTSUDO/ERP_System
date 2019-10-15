const express = require("express")
const { newNews,readNews,NewsKills,NewsId,NewsSetDateDelete} = require("../controllers/News")

const router = express.Router({mergeParams: true});

router.post('/worker/news', readNews)
router.post('/worker/read/:newsId',NewsSetDateDelete)
router.post('/new/news',  newNews)

router.param('newsId',NewsId)
module.exports = router
