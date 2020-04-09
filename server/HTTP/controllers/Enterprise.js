const POSITION = require('../database/Company/CompanyPosts');
const COMPANY = require('../database/Company/Company');
exports.getAllRole = (req, res) => {
	POSITION.find({}).then((data) => {
		return res.status(200).json(data);
	});
};

exports.newRole = (req, res) => {
	let role = new POSITION(req.body);
	role.save().then((data) => {
		return res.status(200).json(data);
	});
};
exports.deletRole = (req, res) => {
	let { id } = req.body;
	POSITION.findByIdAndDelete(id).then((result) => {
		return res.status(200).json(result);

	});
};
exports.NewPermission = (req, res) => {};
