const express = require("express")
const { 
    newNews,
    readNews,
    NewsKills,
    NewsId,
    NewsSetDateDelete,
    readNewsQuality,
    NewsDelete,
    SetNews,
    NewNewsFeatursJob
    } = require("../controllers/News")
const {
    NewPushingNotifycation,
    NewPushToObjectWorker,
    NewPushToSetStatus
    } = require("../controllers/push")

const { NewTodoUserAwesomeNews } = require("../controllers/todo.js")

const { requireSignin } = require("../middleware/middleware.js")

const router = express.Router({ mergeParams: true });



router.post('/new/news/features/position',NewNewsFeatursJob)
router.post('/news/quality',readNewsQuality)
router.post('/worker/news', requireSignin, readNews)
router.post('/worker/read/:newsId', requireSignin, NewsSetDateDelete)
router.post('/new/news', requireSignin, newNews,NewPushingNotifycation)
router.post('/new/news/coments', requireSignin, newNews,NewPushToObjectWorker)
router.post('/new/news/set/status', requireSignin, newNews,NewPushToSetStatus)
router.post('/new/news/job', requireSignin, NewTodoUserAwesomeNews, SetNews,NewPushingNotifycation)
router.delete('/news/delete/:newsId', requireSignin, NewsDelete)
router.param('newsId', NewsId)


module.exports = router
