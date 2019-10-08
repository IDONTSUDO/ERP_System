const TODO = require('../database/UserTodo')
const COMMENTS = require('../database/Comments')
const WORKER =  require('../database/Company')
const formidable = require('formidable')
const fs = require('fs')
const _  = require('lodash')
const dateFormat = require('dateformat')

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

exports.ComentById = (req, res, next, id) =>{
    
    COMMENTS.findById(id)
        .exec((err, coment) => {
            if (err || !coment) {
                return res.status(400).json({
                    error: "коментарий не найден"
                });
            }
            
            req.coment = coment;
            next();
        });
}

exports.SOSotodo =(req,res) =>{
    
}
exports.myTodoItsDay = (req,res,next) =>{
    let time_now = Date.now()
    let time = dateFormat(time_now, "dddd, mmmm, yyyy")
    console.log(time)
   
    
    TODO.find({ $and: [{"time" :{  $eq: `${time}`}},{ tags: { $elemMatch :{"_id":`${req.worker._id}`}} }]}) 
  
    .exec((err, todos) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json({todos})
    })

    

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

    console.log(req.worker )
    const todo = new TODO(req.body)
    todo.postedBy = req.worker 

    todo.save().then(result =>{
        res.status(200).json({
            "дело":"создано!"
        })
    })
    
}

exports.TodoChange = (req,res) =>{
    console.log(200)
        let todo = req.todo;
        todo = _.extend(todo, req.body);
        todo.updated = Date.now();

        todo.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(todo);
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

exports.DeleteComent = (req,res) =>{
  
    let coment = req.coment
    coment.remove((err, coment) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Coment deleted successfully'
        })
    })
}