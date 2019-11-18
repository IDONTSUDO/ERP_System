const express = require("express")
const { test } = require("../controllers/test.integration.js")

const router = express.Router({mergeParams: true});

router.post('/test', test)



module.exports = router
