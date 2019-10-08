const express = require("express")
const { newNews,readNews,NewsKills,readNewsAndUpdate } = require("../controllers/News")

const router = express.Router({mergeParams: true});

router.post('/worker/news', readNews)
router.post('/worker/read',readNewsAndUpdate,NewsKills)
router.post('/new/news',  newNews)


module.exports = router
