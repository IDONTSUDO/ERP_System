const TODO = require('../database/UserTodo')
const COMMENTS = require('../database/Comments')
const WORKER =  require('../database/Company')
const formidable = require('formidable')
const fs = require('fs')
const _  = require('lodash')

exports.SOSotodo =(req,res) =>{
    
}
exports.myTODO = (req,res) =>{

    TODO.find({ tags: { $elemMatch :{"_id":`${req.worker._id}`}} })  
  
    .exec((err, todos) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json({todos})
    })
}
exports.MyTodoAwesome = (req,res) =>{
    
    TODO.find({ tags: req.worker._id})
    .exec((err, posts) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts)
    })
}
exports.NewTodoUserAwesome = (req,res) =>{

    const todo = new TODO(req.body) 
    todo.save().then(result =>{
        res.status(200).json({
            todo: result
        })
    })
    
}
exports.TodoById = (req, res, next, id) =>{
    
    TODO.findById(id)
        .exec((err, todo) => {
            if (err || !todo) {
                return res.status(400).json({
                    error: "дело не найдено"
                });
            }
            
            req.todo = todo;
            next();
        });
}
exports.TodoChange = (req,res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save post
        let todo = req.todo;
        todo = _.extend(todo, fields);
        todo.updated = Date.now();

        if (files.photo) {
            todo.photo.data = fs.readFileSync(files.photo.path);
            todo.photo.contentType = files.photo.type;
        }

        todo.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(todo);
        });
    });
}
exports.NewUserNews = (req,res) =>{

    WORKER.findByIdAndUpdate(req.body.workerId, { $push: { news: req.body.todoId } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        }
    );
}
exports.GetTodo = (req,res) =>{
    return res.json(req.todo)
}
exports.NewComents = (req,res) =>{

    const comments = new COMMENTS(req.body) 
    comments.save().then(result =>{
        res.status(200).json({
            comments: result
        })
    })
}
exports.FindComments = (req,res) =>{
    console.log(req.body.todoId)

    COMMENTS.find({ todoId: req.body.todoId})
    .exec((err, posts) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts)
    })
}