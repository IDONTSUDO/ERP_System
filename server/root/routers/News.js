const express = require("express")
const { newNews, readNews, NewsKills, NewsId, NewsSetDateDelete,readNewsQuality,NewsDelete,SetNews} = require("../controllers/News")


const {NewTodoUserAwesomeNews  } = require("../controllers/todo.js")

const { requireSignin } = require("../middleware/middleware.js")
const router = express.Router({ mergeParams: true });

router.post('/news/quality',readNewsQuality)
router.post('/worker/news', requireSignin, readNews)
router.post('/worker/read/:newsId', requireSignin, NewsSetDateDelete)
router.post('/new/news', requireSignin, newNews)
router.post('/new/news/job', requireSignin, NewTodoUserAwesomeNews, SetNews)
router.post('/new/delete/:newsId', requireSignin, NewsDelete)
router.param('newsId', NewsId)
module.exports = router
