const _  = require('lodash')
const fs = require('fs')
const formidable = require("formidable")
const Worker = require('../database/Company')

exports.workerSelectId = async (req, res , next , id) =>{
    await Worker.findById(id).select(" _id ")
    .exec((err, worker)=>{
        if(err || !worker){
            return res.status(400).json({
                error: "Worker not found"
            })
        }
        req.worker  = worker 
        next()
    })
}

exports.workerById = async (req, res , next , id) =>{
    await Worker.findById(id)
    .exec((err, worker)=>{
        if(err || !worker){
            return res.status(400).json({
                error: "Worker not found"
            })
        }
        req.worker  = worker 
        
        next()
    })
}
exports.Newworker = async(req,res)=>{
    const workerExists = await Worker.findOne({email: req.body.email})
    if(workerExists) return res.status(403).json({
        error: "Email is taken"
    })
    const worker = await new Worker(req.body)
    await worker.save()
    res.status(200).json({ message: "Worker create!" })
}
exports.workerBlock = async (req,res) =>{
    res.status(200)
}
exports.workerDelete = async (req,res) =>{
     let worker =  req.worker
     await worker.remove((err, worker) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "Worker delete!"})
    })
}
exports.workerEdit = async(req,res,next) =>{
    let form = new formidable.IncomingForm()

    form.keepExtensions = true;
    await form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }

        let worker =  req.worker
        
        worker =  _.extend(worker, fields)

        worker.updated = Date.now()


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
            res.json({worker})
        })
    })
}
exports.workerGet = async (req,res) =>{
     return res.json(req.worker)
}
exports.workerAll = async (req,res) =>{
    const worker = Worker.find().select(" _id name")
    .then((worker) =>{
        res.status(200).json(worker)
    })
    .catch(err => console.log(err))
}
exports.workerFinancyAll = (req, res) =>{

}
exports.workerDelete = async (req,res) => {
    let worker = req.worker;
    worker.remove((err,worker) => {
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
exports.workerPhoto = async (req,res, next) =>{
    if(req.worker.photo.data){
        res.set(("Content-Type", req.worker.photo.contentType))
        return res.send(req.worker.photo.data)
    }
    next()
}

exports.ListworkerAll = async (req,res) =>{
    const currentPage = req.query.page || 1

    const perPage = 24
    var totalItems

    const company = await Worker.find()
     
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Worker.find()
                .skip((currentPage - 1) * perPage)
                .select('_id name')
                .limit(perPage)
              //.sort({ })
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}


exports.searchWorker = (req,res) =>{
    let searchItemCollection  = req.body.search
    Worker.find({searchItemCollection: new RegExp(req.body.item, 'i')}) 
    .then(worker => res.json(worker))
    .catch(e => console.error(e))
}