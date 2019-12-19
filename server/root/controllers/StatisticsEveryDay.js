let StatisticsEveryDayAll = require('../database/StatisticsEveryDay')




exports.NewStatistic = async (req, res) =>{

    let UserId =  req.auth 

    let d = new Date();
    let curr_date = d.getDate()
    let curr_month = d.getMonth() + 1
    let curr_year = d.getFullYear()
    
    let times =  `${curr_year}-${curr_month}-${curr_date}`
    const statistic = new StatisticsEveryDayAll()
    
    statistic.day = times
    statistic.userBy = UserId

// TODO

    statistic.save().then(result => { 
        res.status(200).json(result)
    })
}
exports.UpdateStatisticTodoComplete= async (req, res) =>{
    let findId = req.body.userId
    
    StatisticsEveryDayAll.findOneAndUpdate(findId,{$inc: { todo_complete: +1}})
    res.status(200).json({"ok":"ok"})
}
exports.UpdateStatisticTodoAssign = async (req, res) =>{
    let findId = req.body.userId
    
    StatisticsEveryDayAll.findOneAndUpdate(findId,{$inc: { assigned_todo: +1}})
    res.status(200).json({"ok":"ok"})
}
exports.UpdateStatisticTodoAssign = async (req, res) =>{
    let findId = req.body.userId
    
    StatisticsEveryDayAll.findOneAndUpdate(findId,{$inc: { comment: +1}})
    res.status(200).json({"ok":"ok"})
}


exports.GetAllStatistic = async (req, res) =>{ 

}
