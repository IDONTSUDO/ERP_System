const express = require("express");
const {
  getHuman,
  newHuman,
  editHuman,
  humanId,
  deleteHuman
} = require("../controllers/AgentAtHuman.js");
const { agentId } = require("../controllers/ContrAgent");

const router = express.Router({ mergeParams: true });

router.post("/agent/at/human/", getHuman);
router.post("/agent/new/human/:agentId", newHuman);
router.put("/edit/human/:humanId", editHuman);
router.delete("/delet/human/:humanId",deleteHuman)
router.param("agentId", agentId);
router.param("humanId", humanId);
module.exports = router;
