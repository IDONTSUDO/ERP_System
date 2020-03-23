const AgentPeopel = require("../database/Agent/AgentPeopel");

exports.getHuman = async (req, res) => {
  let { agentId } = req.body;
  AgentPeopel.find({ AgentBy: agentId }).then(data => {
    return res.status(200).json(data);
  });
};
exports.editHuman = () => {};
exports.humanId = () => {};
exports.newHuman = () => {};
