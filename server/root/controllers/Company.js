const _ = require('lodash')
const fs = require('fs')
const formidable = require("formidable")
const Worker = require('../database/Company')
const UserSecurity = require('../database/Security')
const UserStatistic = require('../database/UserStatistic')
const ManagePriced = require('../database/ManagePrice')

exports.workerSelectId = async (req, res, next, id) => {
    Worker.findById(id).select(" _id ")
        .exec((err, worker) => {
            if (err || !worker) {
                return res.status(400).json({
                    error: "Worker not found"
                })
            }
            req.worker = worker
            next()
        })
}

exports.workerById = async (req, res, next, id) => {
    Worker.findById(id)
        .exec((err, worker) => {
            if (err || !worker) {
                return res.status(400).json({
                    error: "Worker not found"
                })
            }
            req.worker = worker

            next()
        })
}
exports.Newworker = async (req, res, next) => {
    const workerExists = await Worker.findOne({ email: req.body.email })
    if (workerExists) return res.status(403).json({
        error: "Email is taken"
    })
    const worker = await new Worker(req.body)
    worker.save().then((worker) => {
        req.worker = worker._id
        { { ["Директор", "Управляющий", "Менеджер"].includes(worker.role) ? ManagePriced.create({ userBy: worker._id }, function (err, small) { if (err) return handleError(err) }) : {} } }
        next()
    })
        .catch(err => console.log(err))
}
exports.WorkerStatisticTabel = async (req, res, next) => {

    const statistic = new UserStatistic()
    statistic.Userby = req.worker

    statistic.save().then(result => {
        res.status(200).json({
            "result": "создано!"
        })
    })

}
exports.workerBlock = async (req, res) => {
    res.status(200)
}
exports.workerDelete = async (req, res) => {
    let worker = req.worker
    await worker.remove((err, worker) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "Worker delete!" })
    })
}
exports.workerEdit = async (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {

            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }

        let worker = req.worker

        worker = _.extend(worker, fields)

        worker.updated = Date.now()
        worker.avatar = true
        if (files.photo) {
            worker.photo.data = fs.readFileSync(files.photo.path)
            worker.photo.contentType = files.photo.type
        }

        worker.save((err, result) => {

            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({ result })
        })
    })
}
exports.workerGet = async (req, res) => {
    return res.json(req.worker)
}
exports.workerAll = async (req, res) => {
    const worker = await Worker.find().select(" _id name avatar")
        .then((worker) => {
            res.status(200).json(worker)
        })
        .catch(err => console.log(err))
}
exports.workerFinancyAll = async (req, res) => {
    res.status(200)
}
exports.workerDelete = async (req, res) => {
    let worker = req.worker;
    await worker.remove((err, worker) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Работник удален("
        });
    });
}
exports.workerPhoto = async (req, res, next) => {
    if (req.worker.photo.data) {
        res.set(("Content-Type", req.worker.photo.contentType))
        return res.send(req.worker.photo.data)
    }
    next()
}

exports.ListworkerAll = async (req, res) => {
    const currentPage = req.query.page || 1

    const perPage = 24
    var totalItems

    const company = await Worker.find()

        .countDocuments()
        .then(count => {
            totalItems = count;
            return Worker.find()
                .skip((currentPage - 1) * perPage)
                .select('_id name avatar')
                .limit(perPage)

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}


exports.searchWorker = async (req, res) => {
    let searchItemCollection = req.body.search
    await Worker.find({ searchItemCollection: new RegExp(req.body.item, 'i') })
        .then(worker => res.json(worker))
        .catch(e => console.error(e))
}
exports.WokerToManagerRole = async (req, res) => {
    let FindQuery = 'Менеджер'
    await Worker.find({ role: `${FindQuery}` })
        .select(" _id name ")
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json({ user })
        })
}