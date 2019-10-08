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
    Listworker } = require('../controllers/Company.js')


const router = express.Router({mergeParams: true});
// // ---------- создание нового пользователя ---------- // 
router.post('/new/worker/', Newworker)
// // ---------- блок пользователя  ---------- // 
router.post('/block/worker/:workerById',  workerBlock)


// // ---------- удаление пользователя  ---------- // 
router.delete('/delete/worker/:workerById',  workerDelete)


// // ---------- изменение пользователя ---------- // 
router.put('/edit/worker/:workerById',  workerEdit)



// // ---------- выдача информации по ID пользователя  ---------- // 
router.get('/worker/get/:workerById',  workerGet)
// // // ---------- список всех пользователей  ---------- // 
router.get('/all/worker',workerAll)
// // // ---------- выдача всех пользователей  ---------- // 
router.get('/all/worker/list',ListworkerAll)
// // // ---------- выдает пользовательское фото принемает ID ---------- // 
router.get('/user/photo/:workerById', workerPhoto)
// // // ----------  ---------- // 
router.get('/all/financy',workerFinancyAll)

// router.get('/all/workers/list/', Listworker)


// ----------  ---------- // 
router.post('/test/search/', searchWorker)

// // ----------  ---------- // 
router.param('workerById',workerById)

module.exports = router
