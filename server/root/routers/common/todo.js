const express = require("express")
const { SOSotodo, myTODOsoso,MyTodoAwesome,NewTodoUserAwesome} = require("../../controllers/common/todo")
const {workerById} = require("../../controllers/direct/Company")
const router = express.Router({mergeParams: true});

router.get('/my/todo/list/greate/:workerById', MyTodoAwesome)
router.get('/my/todo/soso/:workerById', myTODOsoso)
router.post('/new/todo/so-so/:workerById', SOSotodo )
router.post('/new/todo/awesome/:workerById',NewTodoUserAwesome)
router.param('workerById',workerById)

module.exports = router
