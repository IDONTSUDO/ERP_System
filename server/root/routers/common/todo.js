const express = require("express")
const { 
    SOSotodo, 
    myTODO,
    NewTodoUserAwesome,
    TodoById,
    TodoChange,
    NewUserNews} = require("../../controllers/common/todo")
const {workerById} = require("../../controllers/direct/Company")
const router = express.Router({mergeParams: true});

router.get('/my/todo/soso/:workerById', myTODO)
router.post('/new/todo/so-so/:workerById', SOSotodo )
router.post('/new/todo/awesome/:workerById',NewTodoUserAwesome)


router.put('/user/news/', NewUserNews)




router.patch('/todo/change/:todoid', TodoChange)
router.param('workerById',workerById)
router.param('todoid',TodoById)
module.exports = router
