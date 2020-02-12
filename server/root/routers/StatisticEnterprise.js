// curl -X POST http://localhost:8080/integration/on

const express = require("express")
const {
 
} = require("../controllers/StatisticEnterprise.js")
const {jwtTokenUserId,requireSignin} = require("../middleware/middleware.js")
const router = express.Router({mergeParams: true});


router.post('/agent/static')
module.exports = router