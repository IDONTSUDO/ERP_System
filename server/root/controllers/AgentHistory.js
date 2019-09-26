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
exports.NewHistory = async (req, res) =>{

    const history = new History(req.body)
    history.postedBy = req.body.userId
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
    let statusSearch = "Выполнено"

    History.find({ $and: [ { postedBy: { $in: userId } }, { status: { $in: statusSearch } } ] })  
    
    .exec((err, history) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json(history)
    })
}
exports.myHistoryBeginer= async (req, res) =>{

}