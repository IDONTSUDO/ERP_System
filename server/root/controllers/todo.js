const TODO = require('../database/UserTodo')
const COMMENTS = require('../database/Comments')
const WORKER =  require('../database/Company')
const formidable = require('formidable')
const fs = require('fs')
const _  = require('lodash')
const dateFormat = require('dateformat')

exports.TodoById = async (req, res, next, id) =>{
    
    await TODO.findById(id)
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

exports.ComentById = async (req, res, next, id) =>{
    
    await COMMENTS.findById(id)
        .exec((err, coment) => {
            if (err || !coment) {
                return res.status(400).json({
                    error: "коментарий не найден"
                })
            }
            
            req.coment = coment;
            next()
        })
}

exports.SOSotodo =(req,res) =>{
    
}
exports.myTodoItsDay = async(req,res,next) =>{
    let time_now = Date.now()
    let time = dateFormat(time_now, "dddd, mmmm, yyyy")

   
    
    await TODO.find({ $and: [{"time" :{  $eq: `${time}`}},{ tags: `${req.worker._id}`}]}) 
  
    .exec((err, todos) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log(todos)
        res.json({todos})
    })

    

}
exports.myTODO = async (req,res) =>{


    await TODO.find({ tags: `${req.worker._id}`})  
  
    .exec((err, todos) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json({todos})
    })
}
exports.MyTodoAwesome = async (req,res) =>{
    
    await TODO.find({ tags: req.worker._id})
    .exec((err, posts) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts)
    })
}
exports.NewTodoUserAwesome = async (req,res) =>{

  
    const todo = new TODO(req.body)
    todo.postedBy = req.worker 

    todo.save().then(result =>{
        res.status(200).json({
            "дело":"создано!"
        })
    })
    
}

exports.TodoChange =  async (req,res) =>{
  
        let todo = req.todo;
        todo = _.extend(todo, req.body);
        todo.updated = Date.now();

        await todo.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(todo);
        });

}
exports.NewUserNews = async (req,res) =>{

    await WORKER.findByIdAndUpdate(req.body.workerId, { $push: { news: req.body.todoId } }, { new: true }).exec(
        (err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result)
            }
        }
    )
}
exports.GetTodo = async (req,res) =>{
console.log(req.todo)
    return await res.json(req.todo)
}
exports.NewComents = async (req,res) =>{
    const comments = new COMMENTS(req.body) 
    comments.save().then(result =>{
        res.status(200).json({
            comments: result
        })
    })
}
exports.FindComments = async (req,res) =>{
    

    await COMMENTS.find({ todoId: req.body.todoId})
    .exec((err, posts) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts)
    })
}

exports.DeleteComent = async (req,res) =>{
  
    let coment = req.coment
    await coment.remove((err, coment) => {
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
exports.GetcomandTodo = async (req,res)=>{
    let userId = req.body.userId
    TODO.find({JobArray:  { $elemMatch:  {user:userId}}})
    .select("comand _id title importance JobArray status postedBy")
    .exec((err, result) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({result})
    })
}