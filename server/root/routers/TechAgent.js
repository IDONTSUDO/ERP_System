const express = require("express")
const {
    getAll, 
    saveTechCollection,
    SaveTechOntheBasisOfSpec,
    TechColId,
    SaveAtTechNode,
    getTechNode,
    Techid,
    getTestPopulate
} = require("../controllers/Tech")
const { jwtTokenUserId, requireSignin } = require("../middleware/middleware.js")
const router = express.Router({ mergeParams: true });

router.get('/get/test',getTestPopulate)
router.get('/get/spec/tech/all', getAll)
router.post('/new/tech/collection', saveTechCollection)
router.post('/save/tech/by/collection/:techColId', SaveTechOntheBasisOfSpec)
router.post('/save/tech/by/node/:Techid', SaveAtTechNode)
router.get('/get/node/:Techid',getTechNode)

router.param('techColId',TechColId)
router.param('Techid',Techid)

module.exports = router