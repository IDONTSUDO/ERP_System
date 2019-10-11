const History = require('../database/AgentHistory.js')
const CommentHistory = require('../database/AgentComment.js')
const _  = require('lodash')
exports.HistoryById = async (req, res , next , id) =>{
    await History.findById(id)
    .exec((err, history)=>{
        if(err || !history){
            return res.status(400).json({
                error: "History not found"
            })
        }
        req.history  = history
        
        next()
    })
}

exports.GetHistoryOne = async (req, res) =>{
    let history = req.history

    res.status(200).json(history)
}
exports.NewHistory = async (req, res) =>{

    const history = new History(req.body)
    history.postedBy = req.body.userId
    console.log(req.body)
    console.log(req.userId)

    await history.save().then(result =>{
        res.status(200).json({
            "История":"создана!"
        })
    })
    
}
exports.NewComent = async (req, res) =>{

    const historyComent = new CommentHistory(req.body)
    await historyComent.save().then(result =>{
        res.status(200).json({
            "Новый кометарий":"создан!"
        })
    })
}
exports.changeHistory = async (req, res) =>{
    let history = req.history 
    console.log(history)
    console.log(req.body)
    history = _.extend(history,req.body)
    
   
    await history.save((err, result) => {
        
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        
        res.json(result)
    })
}

exports.myHistoryActive= async (req, res) =>{
    let userId = req.body.userId
    let statusSearch = "Активно"

    await History.find({ $and: [ { postedBy: { $in: userId } }, { status: { $in: statusSearch } } ] })  
    
    .exec((err, history) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log(history)
        res.json(history)
    })
}
exports.myHistoryBeginer= async (req, res) =>{
    let userId = req.body.userId
    let statusSearch = "Начато"

    await History.find({ $and: [ { postedBy: { $in: userId } }, { status: { $in: statusSearch } } ] })  
    
    .exec((err, history) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json(history)
    })
}
exports.myHistoryComplete = async (req, res) =>{
    let userId = req.body.userId
    let statusSearch = "Завершено"

    await History.find({ $and: [ { postedBy: { $in: userId } }, { status: { $in: statusSearch } } ] })  
    
    .exec((err, history) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json(history)
    })
}
exports.AllAgentHistotory = async (req, res) =>{
    let agentId = req.body.agentId
    const currentPage = req.query.page || 1

    const perPage = 5
    var totalItems

    const company = await History.find( { agentByid: { $in: agentId }   }  )
        .countDocuments()
        .then(count => {
            totalItems = count;
            return History.find( { agentByid: { $in: agentId }   }  )
                .skip((currentPage - 1) * perPage)
                .select('_id name Date')
                .limit(perPage)
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}