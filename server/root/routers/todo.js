const express = require("express")
const { 
    SOSotodo, 
    myTODO,
    NewTodoUserAwesome,
    TodoById,
    TodoChange,
    NewUserNews,
    GetTodo,
    NewComents,
    FindComments} = require("../controllers/todo")
const {workerById,workerSelectId} = require("../controllers/Company")
const router = express.Router({mergeParams: true});


router.get('/todo/:todoid',GetTodo)
router.get('/my/todo/soso/:workerSelectId', myTODO)


router.post('/get/todo/coments/', FindComments)
router.post('/new/todo/so-so/:workerById', SOSotodo )
router.post('/new/todo/awesome/:workerById',NewTodoUserAwesome)
router.post('/comment/todo/',NewComents)


 
router.put('/user/news/', NewUserNews)
 
router.patch('/todo/change/:todoid', TodoChange)

router.param('workerSelectId',workerSelectId) 
router.param('workerById',workerById)
router.param('todoid',TodoById)

module.exports = router
