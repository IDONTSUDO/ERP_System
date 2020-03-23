const PriceManageAtAgent = require("../database/Agent/PriceManageAtAgent.js");
const ManagePriced = require("../database/Agent/ManagePrice.js");
exports.ManageGetAgent = async (req, res) => {};
exports.GetPriceByManage = async (req, res, id) => {
  let agentId = req.body.AgentId;
  PriceManageAtAgent.find({ AgentBy: agentId }).then((result, err) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json(result);
    }
  });
};
exports.DeletePriceAtManageToAgent = async (req, res) => {
  let id = req.body.priceId;
  PriceManageAtAgent.findOneAndDelete({ _id: id }).then((result, err) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({ delete: "one" });
  });
};
exports.ManageAllAgent = async (req, res) => {};
exports.PutManagePrice = async (req, res) => {};
exports.NewPriceAtAgent = async (req, res) => {
  let userBy = req.body.userBy;
  let agentId = req.body.agentId;
  let price = req.body.percent;
  let priced = new PriceManageAtAgent();

  priced.AgentBy = agentId;
  priced.UserBy = userBy;
  priced.price = price;

  priced.save().then(result => {
    res.status(200).json({
      curd: result
    });
  });
};
exports.MyPriced = async (req, res) => {};
exports.PutToMyPriced = async (req, res) => {};
