let StatisticsEveryDayAll = require('../database/StatisticsEveryDay')
let Statistic = require('../database/UserStatistic.js')



exports.NewStatistic = async (req, res) =>{

    let UserId =  req.auth 

    let d = new Date();
    let curr_date = d.getDate()
    let curr_month = d.getMonth() + 1
    let curr_year = d.getFullYear()
    
    let times =  `${curr_year}-${curr_month}-${curr_date}`
  
    StatisticsEveryDayAll.find({day:times,userBy:UserId}).then((result) =>{
    
       if(result[0] === undefined){
           console.log(1)
        const statistic = new StatisticsEveryDayAll()
    
        statistic.day = times
        statistic.userBy = UserId
    
    
        statistic.save().then(result => { 
            res.status(200).json(result)
        })

       }else{
            return res.status(200).json(result[0])
       }
    })
}
exports.UpdateStatisticTodoComplete= async (req, res) =>{
    let findId = req.body.statisticId
    StatisticsEveryDayAll.findOneAndUpdate(findId,{$inc: { todo_complete: +1,value:+1}}).then(data =>{
        res.status(200).json({"ok":"ok"})  
    })
}
// 
exports.UpdateStatisticTodoAssign = async (req, res) =>{
    let findId = req.body.statisticId
    
    StatisticsEveryDayAll.findOneAndUpdate(findId,{$inc: { assigned_todo: +1,value:+1}}).then(data =>{
        res.status(200).json({"ok":"ok"})
    })
}
// 
exports.UpdateStatisticCommentResult = async (req, res) =>{
    let findId = req.body.statisticId    
    StatisticsEveryDayAll.findOneAndUpdate(findId,{$inc: { comment: +1,value:+1 }}).then(data =>{
        res.status(200).json({"ok":"ok"})  
    })
}


exports.GetAllStatistic = async (req, res) =>{ 
    let userId  = req.body.userId
    console.log(userId)

    Statistic.find({Userby:userId}).then(data =>{
        let result =  []
        for(dat of data[0].day){
            result.push(dat)
        }
        return res.status(200).json(result)
       
    })
}
