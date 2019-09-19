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
    FindComments,
    DeleteComent,
    ComentById,
    myTodoItsDay
} = require("../controllers/todo")
const {workerById,workerSelectId} = require("../controllers/Company")
const router = express.Router({mergeParams: true});


router.get('/todo/:todoid',GetTodo)
router.get('/my/todo/soso/:workerSelectId', myTODO)

router.get('/today/todo/:workerSelectId', myTodoItsDay)

router.post('/get/todo/coments/', FindComments)
router.post('/new/todo/so-so/:workerById', SOSotodo )
router.post('/new/todo/awesome/:workerSelectId',NewTodoUserAwesome)
router.post('/comment/todo/',NewComents)
router.post('/delete/comment/:comentById',DeleteComent)

 
router.put('/user/news/', NewUserNews)
 
router.post('/todo/change/:todoid', TodoChange)


router.param('comentById',ComentById) 
router.param('workerSelectId',workerSelectId) 
router.param('workerById',workerById)
router.param('todoid',TodoById)

module.exports = router
