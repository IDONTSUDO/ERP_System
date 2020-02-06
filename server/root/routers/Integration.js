const express = require("express")
const {integrationAllAgent} =require("../controllers/Integration.js")
const {requireSignin} = require("../middleware/middleware.js")

const router = express.Router({mergeParams: true});

// curl -X POST http://localhost:8080/integration/on
router.post('/integration/on',integrationAllAgent)
// requireSignin


module.exports = router
