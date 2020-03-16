const express = require("express")
const {
    StatisticManageAtAgent,
    StatisticMailingAgent,
    StatisticJobAtAgent,
    StatisticAgentDatabase,
    StatisticTechAgent,
    statisticManagerAtAgents
} = require("../controllers/StatisticEnterprise.js")
const {jwtTokenUserId,requireSignin} = require("../middleware/middleware.js")


const router = express.Router({mergeParams: true});

router.get('/agnet/static/at/mail',StatisticMailingAgent)
router.get('/agnet/static/at/job',StatisticJobAtAgent)
router.get('/agnet/static/at/all',StatisticAgentDatabase)
router.get('/agnet/static/at/tech/agent',StatisticTechAgent)
router.get('/agent/static/at/manger',StatisticManageAtAgent)
router.get('/agent/at/manager/statistic',statisticManagerAtAgents)

module.exports = router