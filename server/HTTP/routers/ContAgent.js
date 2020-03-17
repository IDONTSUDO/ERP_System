const express = require("express");
const {
  agentId,
  getMyListAgent,
  getAgentProfile,
  SearchAgent,
  AllAgent,
  ChangeAgent,
  DeleteManagerForAgent,
  ManageAddAgent,
  NewAgent,
  AgentStates,
  SearchAgentEmail,
  TodoAgentFind,
  TodoAgentQuality,
  GetYearStatisticAgent,
  GetYearAndMountStatistichAgent,
  taskId,
  getTask,
  NewSpec,
  allSpec,
  specid,
  RemoveSpec,
  changeAgentProfile,
  searchSpec,
  searchGeo,
  addAgentAtManager,
  NewAgentAtRegularoryPosition,
  AgentAtPeopel,
  AgentAtBrachOfice,
  AgentAtNewManagerTodo,
  finalyAgentSave,
  StatisticNewAgent,
  NewRegulatoryPositionAtRegulatoriNews,
  AgentAtTodo,
  GoodNewsByRegulatorPositiom,
  UserDeleteAtAgentNews,UserAddAgentNews,
  agentDontManager,
  NewNewsToManager
} = require("../controllers/ContrAgent");

const { workerById } = require("../controllers/Company");
const { requireSignin } = require("../middleware/middleware.js");

const router = express.Router({ mergeParams: true });

router.get("/agent/list", requireSignin, AllAgent);
router.get("/agent/:agentId", requireSignin, getAgentProfile);
router.get("/agent/todo/:agentId", TodoAgentFind);
router.get("/agent/todo/quality/:agentId", TodoAgentQuality);
router.get("/agent/task/:taskId", getTask);
router.get("/all/spec/agent", allSpec);
router.get("/agent/dont/manage/",agentDontManager)
router.post("/get/geo/search", searchGeo);
router.post("/new/spec/agent", NewSpec);
router.post("/agent/search", requireSignin, SearchAgent);
router.post("/new/agent/:workerById", requireSignin, NewAgent);
router.post("/agent/manage/", requireSignin, getMyListAgent);
router.post(
  "/agent/new/at/manager/",
  addAgentAtManager,
  AgentAtPeopel,
  AgentAtBrachOfice,
  finalyAgentSave,
  AgentAtTodo,
  StatisticNewAgent,
  GoodNewsByRegulatorPositiom
);

router.post(
  "/new/manage/agent/:agentId",
  ManageAddAgent,
  UserDeleteAtAgentNews,
  UserAddAgentNews
);
router.post("/get/contragent/date", AgentStates);
router.post("/search/managing/director/to/email", SearchAgentEmail);
router.post("/year/agent/todo/statistics", GetYearStatisticAgent);
router.post("/year/on/mounth/todo/agent/todo", GetYearAndMountStatistichAgent);
router.post("/get/spec/agents", searchSpec);
router.post(
  "/regulatory/position/add/agent",
  NewAgentAtRegularoryPosition,
  AgentAtPeopel,
  AgentAtBrachOfice,
  AgentAtNewManagerTodo,
  NewNewsToManager,
  StatisticNewAgent,
  NewRegulatoryPositionAtRegulatoriNews,
  finalyAgentSave
);
router.delete(
  "/delete/manage/agent/:workerById",
  requireSignin,
  DeleteManagerForAgent
);
router.delete("/delete/spec/:specid", RemoveSpec);

router.put("/change/agent/:agentId", requireSignin, ChangeAgent);
router.put("/change/agent/profile/:agentId", changeAgentProfile);

router.param("specid", specid);
router.param("workerById", workerById);
router.param("agentId", agentId);
router.param("taskId", taskId);

module.exports = router;
