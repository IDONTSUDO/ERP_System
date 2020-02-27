const express = require("express")
const {
    GetTechList,
    SaveTechAtAgent,
    techId,
    SaveNodeAtTech,
    TechNodesID,
    SaveNodeAtNodeProperty
} = require("../controllers/Tech")
const { jwtTokenUserId, requireSignin } = require("../middleware/middleware.js")
const router = express.Router({ mergeParams: true });


router.get('/get/tech/list',GetTechList)

router.post('/save/tech/at/agent',SaveTechAtAgent)
router.post('/save/node/at/agent/tech/:techIdtest',SaveNodeAtTech)
router.post('/save/node/at/tech/node/:technodes',SaveNodeAtNodeProperty)

router.delete('/del/tech')
router.delete('/del/node')
router.delete('/del/node/prop')

router.param('techIdtest',techId)
router.param('technodes',TechNodesID)

module.exports = router