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
    myTodoItsDay,
    GetcomandTodo,
    MyComandTodo,
    MyComandTodoQuality,
    myTodoItsDayQuality,
    AssignedTask,
    AssiggnedTaskUserBy,
    DeletedTodo,
    MyTodoMouth,
    MyTodoYear
} = require("../controllers/todo.js")
const {agentUpdateStatistic} = require("../controllers/ContrAgent")


const { requireSignin } = require("../middleware/middleware.js")
const { workerById, workerSelectId } = require("../controllers/Company")
const router = express.Router({ mergeParams: true });


router.get('/todo/:todoid', requireSignin, GetTodo)
router.get('/my/todo/soso/:workerSelectId', requireSignin, myTODO)
router.get('/today/todo/:workerSelectId', requireSignin, myTodoItsDay)
router.get('/today/todo/qulity/:workerSelectId',  myTodoItsDayQuality)

// TODO [?] GET 

router.post('/my/todo/year',MyTodoYear)
router.post('/my/todo/mounth',MyTodoMouth)
router.post('/assigned/task/userby',AssiggnedTaskUserBy)
router.post('/get/assigned/todo', AssignedTask)
router.post('/get/comand/todo/time/quality/',  MyComandTodoQuality)
router.post('/get/comand/todo/time/', requireSignin, MyComandTodo)
router.post('/get/comand/todo/', requireSignin, GetcomandTodo)
router.post('/get/todo/coments/', requireSignin, FindComments)
router.post('/new/todo/so-so/:workerById', requireSignin, SOSotodo)
router.post('/new/todo/awesome/:workerSelectId', requireSignin, NewTodoUserAwesome)
router.post('/comment/todo/', requireSignin, NewComents)
router.post('/delete/comment/:comentById', requireSignin, DeleteComent)
router.post('/todo/change/:todoid', requireSignin, TodoChange,agentUpdateStatistic)

router.put('/user/news/', requireSignin, NewUserNews)
router.delete('/delete/todo/:todoid', requireSignin,DeletedTodo)
router.param('comentById', ComentById)
router.param('workerSelectId', workerSelectId)
router.param('workerById', workerById)
router.param('todoid', TodoById)

module.exports = router
