const ContrAgent = require("../database/ContrAgent");
const TodoAgent = require("../database/AgentTasks");
const AgentStatistic = require("../database/AgentStatistic");
const Specialisation = require("../database/Specialisations");
const AgentCron = require("../database/CronTaskAtAgent");
const AgentHuman = require("../database/AgentPeopel");
const AgentOffice = require("../database/AgentOffice");
let moment = require("moment");
const _ = require("lodash");

exports.taskId = async (req, res, next, id) => {
  TodoAgent.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({ error: "Tasks not found" });
    }
    req.task = result;
    next();
  });
};

exports.agentId = async (req, res, next, id) => {
  ContrAgent.findById(id).exec((err, agent) => {
    if (err || !agent) {
      return res.status(400).json({
        error: "Agent not found"
      });
    }
    req.agent = agent;
    next();
  });
};

exports.specid = async (req, res, next, id) => {
  Specialisation.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({ error: "spec not found" });
    }
    req.spec = result;
    next();
  });
};
exports.RemoveSpec = async (req, res) => {
  let spec = req.spec;

  await spec.remove((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({ message: "Spec delete!" });
  });
};

exports.changeAgentProfile = async (req, res) => {
  let agent = req.agent;
  let { payload } = req.body;
  agent = _.extend(agent, payload);
  await agent.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(result);
  });
};
exports.NewSpec = async (req, res) => {
  const spec = new Specialisation(req.body);

  await spec.save((err, result) => {
    // console.log(err)
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json(result);
  });
};
exports.allSpec = async (req, res) => {
  Specialisation.find({}).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        err: err
      });
    }
    res.json(result);
  });
};

exports.getTask = async (req, res) => {
  let task = req.task;
  return res.status(200).json(task);
};
exports.getMyListAgent = async (req, res) => {
  ContrAgent.find({
    tags: { $elemMatch: { _id: `${req.body.workerId}` } }
  }).exec((err, agent) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(agent);
  });
};
exports.getAgentProfile = async (req, res) => {
  res.status(200).json(req.agent);
};
exports.SearchAgent = async (req, res) => {
  ContrAgent.find({ name: new RegExp(req.body.item, "i") })
    .select("_id full_name email name agentGeo specialications")
    .then(result => res.json(result))
    .catch(e => console.error(e));
};
exports.searchSpec = async (req, res) => {
  let specList = req.body;

  // let re = /"/gi;
  // const description = w.target.value.replace(re, "");

  ContrAgent.find({ specialications: { $all: [`${specList}`] } })
    .select("_id full_name email name agentGeo specialications")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ err });
      } else {
        // console.log(result)
        return res.status(200).json(result);
      }
    });
};
exports.SearchAgentEmail = async (req, res) => {
  ContrAgent.find({ email: new RegExp(req.body.item, "i") })
    .select("_id full_name email name agentGeo specialications")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ err });
      } else {
        return res.status(200).json(result);
      }
    });
};

exports.AllAgent = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = 50;
  var totalItems;

  const agents = await ContrAgent.find()

    .countDocuments()
    .then(count => {
      totalItems = count;
      return (
        ContrAgent.find()
          .skip((currentPage - 1) * perPage)
          // .select('_id name')
          .limit(perPage)
      );
    })
    .then(agents => {
      res.status(200).json(agents);
    })
    .catch(err => console.log(err));
};
exports.ChangeAgent = async (req, res) => {
  let agent = req.agent;

  agent = _.extend(agent, req.body);

  await agent.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.json(result);
  });
};
exports.ManageAddAgent = async (req, res) => {
  let agent = req.agent;
  agent.tags = req.body.tags;

  agent = _.extend(agent, req.body);

  var agentResult;
  await agent.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    agentResult = result;
    res.json(result);

    let PlaningDateMoment = new Date();
    // +1 day
    PlaningDateMoment.setDate(PlaningDateMoment.getDate() + 1);

    let dateMoment = moment(PlaningDateMoment).format("YYYY-MM-DD");
    // console.log("AGENT     :",agentResult)
    for (let i of agentResult.tags) {
      let agent_cron = new AgentCron();
      agent_cron.PlanningDate = dateMoment;
      agent_cron.UserId = i;
      agent_cron.agent = agentResult;
      agent_cron.agentId = agentResult._id;
      agent_cron.save();
    }
  });
};
exports.DeleteManagerForAgent = async (req, res) => {
  ContrAgent.findByIdAndUpdate(
    req.body.agentId,
    { $pull: { tags: req.body.workerId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
};
exports.ManageAddAgentA = async (req, res) => {
  ContrAgent.findByIdAndUpdate(
    req.body.agentId,
    { $push: { tags: req.body.workerId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
};

exports.NewAgent = async (req, res) => {
  const agent = new ContrAgent(req.body);
  agent.postedBy = req.worker;

  agent.save().then(result => {
    res.status(200).json({
      result
    });
  });
};

exports.AgentStates = async (req, res) => {
  let AgentStat = {};
  function ContrAgentAll() {
    return new Promise(function(resolve, reject) {
      ContrAgent.countDocuments().exec((err, agent) => {
        if (err) {
          throw new Error(reject);
        }

        AgentStat.all = agent;
        return resolve();
      });
    });
  }
  function ContrAgentGeo() {
    return new Promise(function(resolve, reject) {
      ContrAgent.countDocuments({ region: "none" }).exec((err, agent) => {
        if (err) {
          throw new Error(reject);
        }

        AgentStat.region = agent;
        return resolve();
      });
    });
  }
  function ContrAgentEmail() {
    return new Promise(function(resolve, reject) {
      ContrAgent.countDocuments({ email: "none" }).exec((err, agent) => {
        if (err) {
          throw new Error(reject);
        }
        AgentStat.email = agent;
        return resolve();
      });
    });
  }
  function ContrAgentRegion() {
    return new Promise(function(resolve, reject) {
      return resolve();
    });
  }
  function ContrAgentSpecialications() {
    return new Promise(function(resolve, reject) {
      ContrAgent.countDocuments({ specialications: "none" }).exec(
        (err, agent) => {
          if (err) {
            throw new Error(reject);
          }
          AgentStat.specialications = agent;
          return resolve();
        }
      );
    });
  }
  Promise.all([
    ContrAgentSpecialications,
    ContrAgentRegion,
    ContrAgentEmail,
    ContrAgentGeo,
    ContrAgentAll
  ]).then(results => {
    console.log(results);
    console.log(AgentStat);
  });
};
exports.TodoAgentFind = (req, res, id) => {
  let agentId = req.agent._id;

  TodoAgent.find({ agentByTodo: { $all: [`${agentId}`] } }).exec(
    (err, result) => {
      if (err) {
        return res.status(400).json({ err });
      } else {
        console.log(result);
        return res.status(200).json(result);
      }
    }
  );
};
exports.TodoAgentQuality = async (req, res, id) => {
  let agentId = req.agent._id;

  TodoAgent.count({ agentByTodo: { $all: [`${agentId}`] } }).exec(
    (err, result) => {
      if (err) {
        return res.status(400).json({ err });
      } else {
        return res.status(200).json(result);
      }
    }
  );
};

exports.agentUpdateStatistic = async (req, res) => {
  let todoDestr = req.todo;

  let mounth = todoDestr.mounth;
  let agentIdByFind = todoDestr.agentByTodo[1];

  if (mounth === "01") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 1: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "02") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 2: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "03") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 3: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "04") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 4: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "05") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 5: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "06") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 6: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "07") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 7: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "08") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 8: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "09") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 9: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "10") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 10: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "11") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 11: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  } else if (mounth === "12") {
    AgentStatistic.findOneAndUpdate(
      { agentBy: agentIdByFind },
      { $inc: { 12: +1 } },
      function(error, success) {
        if (error) {
          return console.log(error);
        } else {
          return console.log(success);
        }
      }
    );
  }
};
exports.GetYearStatisticAgent = async (req, res) => {
  let { agentId } = req.body;

  AgentStatistic.findOne({ agentBy: agentId }).then((result, err) => {
    if (err) {
      let resultsErr = [];
      return res.status(400).json(resultsErr);
    } else {
      return res.status(200).json(result);
    }
  });
};
exports.GetYearAndMountStatistichAgent = async (req, res) => {
  let { agentId, Year, Mounth } = req.body;
  console.log(agentId, Year, Mounth);
  TodoAgent.find({
    year: Year,
    mounth: Mounth,
    agentByTodo: { $all: [`${agentId}`] }
  }).then((result, err) => {
    if (err) {
      return res.status(400).json({ err });
    } else {
      console.log("agentData", result);
      console.log("err", err);
      return res.status(200).json(result);
    }
  });
};
exports.searchGeo = async (req, res) => {
  let geoData = req.body;

  ContrAgent.find({ agentGeo: { $all: [`${geoData}`] } })
    .select("_id full_name email name agentGeo specialications")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ err });
      } else {
        return res.status(200).json(result);
      }
    });
};

exports.purposeManager = async (req, res) => {
  let agent = req.agent;
};

exports.addAgentAtManager = async (req, res) => {};
exports.NewAgentAtRegularoryPosition = async (req, res, next) => {
  let { newAgent } = req.body;
  let agn = new ContrAgent(newAgent);

  await agn.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    res.status(200);
    req.agent = result;
    return next();
  });
};
exports.AgentAtTodoCron = async (req, res, next) => {
  console.log(newAgent.tags.length);
};
exports.AgentAtPeopel = async (req, res, next) => {
  let { AgentPeopel } = req.body;

  if (AgentPeopel.bio.length > 0) {
    let agnHum = new AgentHuman(AgentPeopel);
    await agnHum.save((err, result) => {
      if (err) {
        return null;
      }

      req.peopelId = result._id;
      return next();
    });
  } else {
    return next();
  }
};
exports.AgentAtBrachOfice = async (req, res, next) => {
  let { AgentFeatus } = req.body;

  if (AgentFeatus !== undefined) {
    let AgentBranch = new AgentOffice(AgentFeatus);
    await AgentBranch.save((err, result) => {
      if (err) {
        return null;
      }
      req.OfficeId = result._id;
      return next();
    });
  } else {
    return next();
  }
  // AgentOffice
};
exports.AgentAtNewManagerTodo = async (req, res, next) => {
  let agent = req.agent;
  let agnCron = new AgentCron();
  if (agent.tags.length > 0) {
    let PlaningDateMoment = new Date();
    PlaningDateMoment.setDate(PlaningDateMoment.getDate() + 1);
    let dateMoment = moment(PlaningDateMoment).format("YYYY-MM-DD");

    for (let i of agent.tags) {
      agnCron.PlanningDate = dateMoment;
      agnCron.UserId = { _id: i._id, name: i.name };
      agnCron.agent = agent;
      agnCron.agentId = agent._id;
      agnCron.save();
    }
    return next();
  } else {
    return next();
  }
};
exports.finalyAgentSave = async (req, res, next) => {
  let agent = req.agent;
  let Human = req.peopelId;
  let Office = req.OfficeId;

  if (Human !== undefined) {
    ContrAgent.findByIdAndUpdate(
      agent._id,
      { $push: { Office: Office } },
      { new: true }
    ).exec((err, result) => {
      if (err) {
       return null
      } else {
        return null
      }
    });
  }
  if (Office !== undefined) {
    ContrAgent.findByIdAndUpdate(
      agent._id,
      { $push: { Human: Human } },
      { new: true }
    ).exec((err, result) => {
      if (err) {
        return null
      } else {
        return null
      }
    });
  }
};

exports.AgentStatistic = async (req, res) => {
  let agent = req.agent;

  let year = moment()
    .locale("ru")
    .format("YY");
  let agnStat = new AgentStatistic();
  agnStat.agentBy = agent._id;
  agnStat.year = year;
  agnStat.save();
  next();
};