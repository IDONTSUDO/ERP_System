let ContrAgent = require("../database/ContrAgent");
let ContrAgentJob = require("../database/AgentTasks");
let Company = require("../database/Company");

exports.StatisticManageAtAgent = async (req, res) => {
  ContrAgent.find({ tags: "none" })
    .count()
    .exec((err, result) => {
      return res.status(200).json({ result });
    });
};

exports.StatisticMailingAgent = async (req, res) => {
  ContrAgent.find({ email: "" })
    .count()
    .exec((err, result) => {
      return res.status(200).json({ result });
    });
};

exports.StatisticSpecAgents = async (req, res) => {
  ContrAgent.find({ specialications: "none" })
    .count()
    .exec((err, result) => {
      return res.status(200).json({ result });
    });
};

exports.StatisticJobAtAgent = async (req, res) => {
  ContrAgentJob.find()
    .count()
    .exec((err, result) => {
      return res.status(200).json({ result });
    });
};

exports.StatisticAgentDatabase = async (req, res) => {
  ContrAgent.find()
    .count()
    .exec((err, result) => {
      return res.status(200).json({ result });
    });
};

exports.StatisticTechAgent = async (req, res) => {
  ContrAgent.find({ tech: "none" })
    .count()
    .exec((err, result) => {
      return res.status(200).json({ result });
    });
};

exports.statisticManagerAtAgents = async (req, res) => {
  Company.find({ role: "Менеджер" })
    .select(" _id name")
    .exec((err, data) => {
      let promises = data.map((el, i) =>
        ContrAgent.find({ tags: { $elemMatch: { _id: `${el._id}` } } })
          .count()
          .then(result => {
            return { _id: data[i]._id, name: data[i].name, result };
          })
      );
      Promise.all(promises).then(results => {
        return res.status(200).json(results);
      });
    });
};
exports.getManagetAtAgent = async (req, res) => {
  let { _id } = req.body;
  ContrAgent.find({
    tags: { $elemMatch: { _id: `${_id}` } }
  }).then(data => {
    let promises = data.map((el, i) =>
      ContrAgentJob.find({
        $and: [{ tags: _id }, { agentByTodo: `${el._id}` }]
      })
        .count()
        .then(data => {
          return { el, Counter: data };
        })
    );
    Promise.all(promises).then(results => {
      return res.status(200).json(results);
    });
  });
};
