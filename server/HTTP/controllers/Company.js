const _ = require('lodash');
const fs = require('fs');
const formidable = require('formidable');
const Worker = require('../database/Company/Company');
const UserSecurity = require('../database/User/Security');
const UserStatistic = require('../database/Statistics/UserStatistic');
const ManagePriced = require('../database/Agent/ManagePrice');
const Subscriber = require('../database/User/Subscriber');
const Posts = require('../database/Company/CompanyPosts');
const CompanyStructures = require('../database/Company/CompanyStructur');
const UserActiveMount = require('../database/Statistics/ActivitiUserMounth');
const geoip = require('geoip-lite');
const moment = require('moment');

exports.CompanyStructuresId = async (req, res, next, id) => {
	CompanyStructures.findById(id).exec((err, result) => {
		if (err || !result) {
			return res.status(400).json({
				error: 'Worker not found'
			});
		}
		req.structures = result;
		return next();
	});
};

exports.workerSelectId = async (req, res, next, id) => {
	Worker.findById(id).select(' _id ').exec((err, worker) => {
		if (err || !worker) {
			return res.status(400).json({
				error: 'Worker not found'
			});
		}
		req.worker = worker;
	});
};

exports.workerById = async (req, res, next, id) => {
	Worker.findById(id).exec((err, worker) => {
		if (err || !worker) {
			return res.status(400).json({
				error: 'Worker not found'
			});
		}

		req.worker = worker;

		next();
	});
};
exports.ManageList = async (req, res) => {
	Worker.find({ role: 'Менеджер' }).select('_id name').then((data) => {
		return res.status(200).json(data);
	});
};
exports.Newworker = async (req, res, next) => {
	const workerExists = await Worker.findOne({ email: req.body.email });
	if (workerExists)
		return res.status(403).json({
			error: 'Email is taken'
		});
	const worker = new Worker(req.body);

	let Year = moment().locale('ru').format('YY');

	worker
		.save()
		.then((worker) => {
			req.worker = worker._id;
			let activeStat = UserActiveMount();
			activeStat.year = Year;
			activeStat.userId = worker._id;
			activeStat.save();

			{
				{
					[ 'Директор', 'Управляющий', 'Менеджер' ].includes(worker.role)
						? ManagePriced.create({ userBy: worker._id }, function(err, small) {
								if (err) return handleError(err);
							})
						: {};
				}
			}
			next();
		})
		.catch((err) => console.log(err));
};
exports.WorkerStatisticTabel = async (req, res, next) => {
	const statistic = new UserStatistic();
	statistic.Userby = req.worker;

	statistic.save().then((result) => {});

	const subsc = new Subscriber();
	subsc.userBy = req.worker;
	subsc.save().then((result) => {
		res.status(200).json({
			result: 'создано!'
		});
		next();
	});
};
exports.workerBlock = async (req, res) => {
	res.status(200);
};
exports.workerDelete = async (req, res) => {
	let worker = req.worker;
	await worker.remove((err, worker) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		res.json({ message: 'Worker delete!' });
	});
};
exports.wokerEditDeviceData = async (req, res) => {
	Worker.findByIdAndUpdate(
		req.body.userId,
		{ $push: { device: req.body.keys } },
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
exports.wokerEditDeviceDataDelete = async (req, res) => {
	Worker.findByIdAndUpdate(
		req.body.userId,
		{ $pull: { device: req.body.keys } },
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
exports.workerEdit = async (req, res, next) => {
	let form = new formidable.IncomingForm();

	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: 'Photo could not be uploaded'
			});
		}

		let worker = req.worker;

		worker = _.extend(worker, fields);

		worker.updated = Date.now();

		if (files.photo) {
			worker.photo.data = fs.readFileSync(files.photo.path);
			worker.photo.contentType = files.photo.type;
			worker.avatar = true;
		}

		worker.save((err, direct) => {
			if (err) {
				return res.status(400).json({
					error: err
				});
			}
			direct.photo = undefined;
			direct.hashed_password = undefined;
			direct.avatar = undefined;
			direct.created = undefined;
			direct.device = undefined;
			direct.logged_in = undefined;
			direct.phone = undefined;
			direct.salt = undefined;
			direct.updated = undefined;
			direct.Date_of_Birth = undefined;
			res.json({ direct });
		});
	});
};
exports.workerGet = async (req, res) => {
	return res.json(req.worker);
};
exports.workerAll = async (req, res) => {
	const worker = Worker.find()
		.select(' _id name avatar role')
		.then((worker) => {
			res.status(200).json(worker);
		})
		.catch((err) => console.log(err));
};
exports.workerFinancyAll = async (req, res) => {
	res.status(200);
};
exports.workerDelete = async (req, res) => {
	let worker = req.worker;
	await worker.remove((err, worker) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}
		res.json({
			message: 'Работник удален('
		});
	});
};
exports.workerPhoto = async (req, res, next) => {
	if (req.worker.photo.data) {
		res.set(('Content-Type', req.worker.photo.contentType));
		return res.send(req.worker.photo.data);
	}
	next();
};

exports.ListworkerAll = async (req, res) => {
	const currentPage = req.query.page || 1;

	const perPage = 24;
	var totalItems;

	const company = Worker.find()
		.countDocuments()
		.then((count) => {
			totalItems = count;
			return Worker.find().skip((currentPage - 1) * perPage).select('_id name avatar role').limit(perPage);
		})
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => console.log(err));
};

exports.searchWorker = async (req, res) => {
	let searchItemCollection = req.body.search;
	Worker.find({ searchItemCollection: new RegExp(req.body.item, 'i') })
		.then((worker) => res.json(worker))
		.catch((e) => console.error(e));
};
exports.WokerToManagerRole = async (req, res) => {
	let FindQuery = 'Менеджер';
	Worker.find({ role: `${FindQuery}` }).select(' _id name ').exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: err
			});
		}

		res.json({ user });
	});
};
exports.getIpGeolocatedData = async (req, res) => {
	let ip = req.body.ip;
	let geo = geoip.lookup(ip);
	res.status(200).json(geo);
};
exports.newPost = async (req, res) => {
	let posts = new Posts(req.body);
	posts.save().then((err, data) => {
		return res.status(200).json(data);
	});
};
exports.getPosts = async (req, res) => {
	Posts.find().then((data) => {
		return res.status(200).json(data);
	});
};
exports.getCompanyStructur = async (req, res) => {
	CompanyStructures.find().sort({ _id: -1 }).limit(1).then((data) => {
		return res.status(200).json(data);
	});
};
exports.NewCompanyStructures = async (req, res) => {
	let company = new CompanyStructures(req.body);
	company.save().then((data) => {
		return res.status(200).json(data);
	});
};
exports.EditCompanyStructures = async (req, res) => {
	var stru = req.structures;
	stru = _.extend(todo, req.body.payload || req.body);
	stru.save().then((data) => {
		if (data === null) {
			return res.status(400).json({ err: 'er' });
		} else {
			return res.status(200).json(data);
		}
	});
};
