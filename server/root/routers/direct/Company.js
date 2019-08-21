const express = require("express")
const { 
    workerById,
    Newworker,
    workerBlock,
    workerEdit,
    workerGet,
    workerManageAll,
    workerFinancyAll } = require("../../controllers/direct/Company")

const router = express.Router({mergeParams: true});

router.post('/new/worker/', Newworker)
router.post('/block/worker/:workerById',  workerBlock)
router.get('/edit/worker/:workerById',  workerEdit)
router.get('/worker/get/:workerById',  workerGet)
router.get('/all/manage',workerManageAll)
router.get('/all/financy',workerFinancyAll)
router.param('workerById',workerById)

module.exports = router
