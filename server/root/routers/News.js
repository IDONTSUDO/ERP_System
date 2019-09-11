const express = require("express")
const { newNews,readNews } = require("../controllers/News")

const router = express.Router({mergeParams: true});

router.post('/worker/news', readNews)
router.post('/new/news',  newNews)


module.exports = router
