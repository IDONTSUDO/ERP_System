const express = require('express');
const { getAllRole, newRole, deletRole } = require('../controllers/Enterprise');

const router = express.Router({ mergeParams: true });

router.get('/all/role', getAllRole);
router.post('/new/role', newRole);
router.post('/delete/role', deletRole);

module.exports = router;
