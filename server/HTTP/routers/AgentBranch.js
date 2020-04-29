const express = require('express');
const {
	getBranchAgent,
	newBranchAtAgent,
	edditBranchAgent,
    deleteBranchAtAgent,
    branchId 
} = require('../controllers/AgentBranch');
const {agentId} = require("../controllers/ContrAgent")
const router = express.Router({ mergeParams: true });

router.post('/agent/at/branch/', getBranchAgent);
router.post('/agent/new/branch/:agentId', newBranchAtAgent);
router.put('/edit/branch/:branchId', edditBranchAgent);
router.delete('/delet/branch/:branchId', deleteBranchAtAgent);
router.param('branchId', branchId);
router.param('agentId',agentId)
module.exports = router;
