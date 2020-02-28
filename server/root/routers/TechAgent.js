const express = require("express")
const {
    GetTechList,
    SaveTechAtAgent,
    techId,
    SaveNodeAtTech,
    TechNodesID,
    SaveNodeAtNodeProperty,
    deletTech,
    delNode,
    delNodeProp,
    nodeId
} = require("../controllers/Tech")
const { jwtTokenUserId, requireSignin } = require("../middleware/middleware.js")
const router = express.Router({ mergeParams: true });


router.get('/get/tech/list',GetTechList)

router.post('/save/tech/at/agent',SaveTechAtAgent)
router.post('/save/node/at/agent/tech/:techId',SaveNodeAtTech)
router.post('/save/node/at/tech/node/:technodId',SaveNodeAtNodeProperty)

router.delete('/del/tech/:techId',deletTech)
router.delete('/del/node/:technodId',delNode)
router.delete('/del/node/prop/:nodeId',delNodeProp)


router.param('nodeId',nodeId)
router.param('techId',techId)
router.param('technodId',TechNodesID)

module.exports = router