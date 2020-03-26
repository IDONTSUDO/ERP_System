const AgentPeopel = require("../database/Agent/AgentPeopel");
const _ = require("lodash");
exports.getHuman = async (req, res) => {
  let { agentId } = req.body;
  // AgentPeopel.find({ AgentBy: agentId }).then(data => {
  //   return res.status(200).json(data);
  // });
  const currentPage = req.query.page || 1;

  const perPage = 24;
  var totalItems;

  const company = AgentPeopel.find({ AgentBy: agentId })
    .countDocuments()
    .then(count => {
      totalItems = count;
      return AgentPeopel.find({ AgentBy: agentId })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err));
};

exports.editHuman = async (req, res) => {
  let { human } = req.body;
  console.log(human);
  human = _.extend(req.human, req.body);
  human.save((err, result) => {
    return res.status(200).json(result);
  });
};
exports.humanId = async (req, res, next, id) => {
  console.log(id);
  await AgentPeopel.findById(id).exec((err, result) => {
    if (err || !result) {
      return res.status(400).json({
        error: "Человек не найден"
      });
    }

    req.human = result;
    next();
  });
};
exports.newHuman = (req, res) => {
  let agn = req.agent;
  let { body } = req.body;
  let agent = new AgentPeopel(body);
  agent.AgentBy = agn._id;

  agent.save().then(data => {
    console.log(data);
    return res.status(200).json(data);
  });
};
exports.deleteHuman = (req, res) => {
  let human = req.human;
  human.remove().then(data => {
    return res.status(200).json(data);
  });
};
