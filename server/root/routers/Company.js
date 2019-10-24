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
    WokerToManagerRole } = require('../controllers/Company.js')

const {requireSignin} = require("../middleware/middleware.js")

const router = express.Router({mergeParams: true});
// // ---------- создание нового пользователя ---------- // 
router.post('/new/worker/',requireSignin, Newworker)
// // ---------- блок пользователя  ---------- // 
router.post('/block/worker/:workerById',requireSignin,  workerBlock)
router.post('/worker/manager/',requireSignin,  WokerToManagerRole)

// // ---------- удаление пользователя  ---------- // 
router.delete('/delete/worker/:workerById', requireSignin, workerDelete)


// // ---------- изменение пользователя ---------- // 
router.put('/edit/worker/:workerById',requireSignin,  workerEdit)



// // ---------- выдача информации по ID пользователя  ---------- // 
router.get('/worker/get/:workerById',requireSignin,  workerGet)
// // // ---------- список всех пользователей  ---------- // 
router.get('/all/worker',requireSignin,workerAll)
// // // ---------- выдача всех пользователей  ---------- // 
router.get('/all/worker/list',requireSignin,ListworkerAll)
// // // ---------- выдает пользовательское фото принемает ID ---------- // 
router.get('/user/photo/:workerById', workerPhoto)
// // // ----------  ---------- // 
router.get('/all/financy',requireSignin,workerFinancyAll)

// router.get('/all/workers/list/', Listworker)


// ----------  ---------- // 
router.post('/test/search/', searchWorker)

// // ----------  ---------- // 
router.param('workerById',workerById)

module.exports = router
