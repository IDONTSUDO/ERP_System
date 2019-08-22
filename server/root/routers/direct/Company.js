const express = require("express")
const { 
    workerById,
    Newworker,
    workerBlock,
    workerEdit,
    workerGet,
    workerAll,
    workerFinancyAll } = require("../../controllers/direct/Company")

const router = express.Router({mergeParams: true});

router.post('/new/worker/', Newworker)
router.post('/block/worker/:workerById',  workerBlock)
router.get('/edit/worker/:workerById',  workerEdit)
router.get('/worker/get/:workerById',  workerGet)
router.get('/all/worker',workerAll)
router.get('/all/financy',workerFinancyAll)
router.param('workerById',workerById)

module.exports = router
