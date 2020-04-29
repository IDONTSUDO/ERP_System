const AgentBranch = require('../database/Agent/AgentOffice');
const _ = require('lodash');

exports.branchId = async (req, res, next, id) => {
	AgentBranch.findById(id).exec((err, result) => {
		if (err || !result) {
			return res.status(400).json({ error: 'Branch not Found' });
		}
		req.branch = result;
		next();
	});
};
exports.getBranchAgent = async (req, res) => {
	
	let { agentId } = req.body;
	AgentBranch.find({ AgentBy: agentId }).exec((err, result) => {
		if (err) {
			return res.status(400).json({ error: 'Not found' });
		}
		return res.status(200).json(result);
	});
};
exports.edditBranchAgent = async (req, res) => {
	let { branch } = req.body;
	branch = _.extend(req.human, req.body);
	branch.save((err, result) => {
		if (err) {
			return res.status(400).json({ error: err });
		}
		return res.status(200).json(result);
	});
};
exports.newBranchAtAgent = async (req, res) => {
	let branch = new AgentBranch(req.body);

	branch.AgentBy = req.agent._id;
	branch.save().then((result) => {
		return res.status(200).json(result);
	});
};
exports.deleteBranchAtAgent = async (req, res) => {
	let branch = req.branch
	AgentBranch.findByIdAndDelete(branch._id).exec((err, result) => {
		if (err) {
			return res.status(400).json({ error: 'branch no delete' });
		}
		return res.status(200).json(result);
	});
};
