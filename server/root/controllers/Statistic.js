const STATISTIC= require('../database/Statistic')



exports.NewStatisticTabel= (req,res) =>{
   
    const newTabel =  new STATISTIC(req.body)
    newTabel.save()
    res.status(200).json({ message: "Tabel create!" })
}

exports.NewUserQuality = (req,res) =>{

    STATISTIC.find().select(" worker_quality ").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log(stat[0].worker_quality)
        let worker_quality = stat[0].worker_quality + 1
        console.log(JSON.stringify({worker_quality}))
        let save = JSON.stringify({worker_quality})
        console.log(save)
        console.log(typeof save)
        const  statistic = new STATISTIC(save) 
        statistic.save().then(result =>{
            res.status(200).json({
            stat: result
        })
    })
    
    })
}
exports.DeleteUserQuality = (req,res) =>{
    STATISTIC.find().select(" worker_quality ").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
       
        let worker_quality = stat[0].worker_quality - 1
       
        let save = JSON.stringify({worker_quality})

        const  statistic = new STATISTICworker(save) 
        statistic.save().then(result =>{
            res.status(200).json({
            stat: result
        })
    })
    
    })
}
exports.GetUserQuality = (req,res) =>{
    STATISTIC.find().select(" worker_quality ")
    .exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        } 
        res.json(stat)
    })
}

exports.Statistic
