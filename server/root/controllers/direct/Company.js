const _  = require('lodash')
const fs = require('fs')
const formidable = require("formidable")
const Worker = require('../../database/direct/Company')

exports.workerById = (req, res , next , id) =>{
    Worker.findById(id)
    .exec((err, worker)=>{
        if(err || !worker){
            return res.status(400).json({
                error: "Worker not found"
            })
        }
        req.profile  = worker 
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
exports.workerBlock = (req,res) =>{
    res.status(200)
}
exports.workerDelete = (req,res) =>{
    let worker = req.profile
    worker.remove((err, worker) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "Worker delete!"})
    })
}
exports.workerEdit =(req,res,next) =>{
    let form = new formidable.IncomingForm()

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }

        let worker = req.profile

        worker = _.extend(worker, fields)

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
exports.workerGet = (req,res) =>{
    req.profile.hashed_password = undefined,
    req.profile.salt = undefined
    return res.json(req.profile)
}
exports.workerAll = (req,res) =>{
    Worker.find((err, users) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(users)
    })
}
exports.workerFinancyAll =(req, res) =>{

}

exports.workerPhoto = (req,res, next) =>{
    if(req.profile.photo.data){
        res.set(("Content-Type", req.profile.photo.contentType))
        return res.send(req.profile.photo.data)
    }
    next()
}

