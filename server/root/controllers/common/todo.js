const TODO = require('../../database/common/UserTodo')
const WORKER =  require('../../database/direct/Company')
const formidable = require('formidable')
const fs = require('fs')
const _  = require('lodash')

exports.SOSotodo =(req,res) =>{
    
}
exports.myTODO = (req,res) =>{
    TODO.find({ user_accountability: req.worker._id})
    .sort("startDate")
    .exec((err, posts) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts)
    })
}
exports.MyTodoAwesome = (req,res) =>{

    TODO.find({ user_accountability: req.worker._id})
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
    let  form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) =>{
      if(err){
          return res.status(400).json({
              error: "Image cloud not be uploaded"
          })
      } 
      let todo = new TODO(fields) 
      todo.postedBy = req.worker
      
      if(files.photo){
          todo.photo.data = fs.readFileSync(files.photo.path)
          todo.photo.contentType = files.photo.type
      }
      todo.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json("Создано");
    });
          
      
    })
    const todo = new TODO(req.body)
    
}
exports.TodoById = (req, res, next, id) =>{
    console.log(200)
    
    TODO.findById(id)
        .exec((err, todo) => {
            if (err || !todo) {
                return res.status(400).json({
                    error: "дело не найдено"
                });
            }
            console.log(todo)
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