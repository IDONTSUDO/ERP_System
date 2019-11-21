const express = require("express")
const {
    workerById,
    Newworker,
    workerBlock,
    workerEdit,
    workerGet,
    workerAll,
    workerFinancyAll,
    workerDelete,
    workerPhoto,
    ListworkerAll,
    searchWorker,
    Listworker,
    WokerToManagerRole,
    WorkerStatisticTabel,
    wokerEditDeviceData,
    wokerEditDeviceDataDelete,
    getIpGeolocatedData } = require('../controllers/Company.js')

const { requireSignin } = require("../middleware/middleware.js")

const router = express.Router({ mergeParams: true });



router.get('/worker/get/:workerById', requireSignin, workerGet)
router.get('/all/worker', requireSignin, workerAll)
router.get('/all/worker/list', requireSignin, ListworkerAll)
router.get('/user/photo/:workerById', workerPhoto)
router.get('/all/financy', requireSignin, workerFinancyAll)

router.post('/worker/manager/', requireSignin, WokerToManagerRole)
router.post('/new/worker/', requireSignin, Newworker,WorkerStatisticTabel)
router.post('/test/search/', searchWorker)
router.post('/block/worker/:workerById', requireSignin, workerBlock)
router.post('/edit/device/', wokerEditDeviceData)
router.post('/delete/device/', wokerEditDeviceDataDelete)
router.post('/get/ip/data',getIpGeolocatedData )

router.delete('/delete/worker/:workerById', requireSignin, workerDelete)

router.put('/edit/worker/:workerById', requireSignin, workerEdit)

router.param('workerById', workerById)

module.exports = router
