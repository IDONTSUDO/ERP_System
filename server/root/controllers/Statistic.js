const STATISTIC= require('../database/Statistic')



exports.NewStatisticTabel = async(req,res) =>{
   
    const newTabel =  new STATISTIC(req.body)
    await newTabel.save()
    res.status(200).json({ message: "Tabel create!" })
}
// worker_quality++
exports.NewUserQuality = async (req,res) =>{

    await STATISTIC.find().select("worker_quality _id").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log(stat[0].worker_quality)
        let id_stat = stat[0]._id
        let worker_quality_plus = stat[0].worker_quality + 1
        
    
        STATISTIC.findByIdAndUpdate(id_stat, { $set: { worker_quality: worker_quality_plus } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                } else {
                    res.json(result);
                }
            }
        )
    })
}
// create_todo++
exports.NewTODOQuality = async (req,res) =>{

    await STATISTIC.find().select("create_todo _id").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
      
        let id_stat = stat[0]._id
        let create_todo_plus = stat[0].create_todo + 1
        
    
        STATISTIC.findByIdAndUpdate(id_stat, { $set: { create_todo: create_todo_plus } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                } else {
                    res.json(result);
                }
            }
        )
    })
}
// TEST complete_todo++ 
exports.NewCompleteTODOQuality = async (req,res) =>{

    await STATISTIC.find().select("complete_todo _id").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        let id_stat = stat[0]._id
        let complete_todo_plus = stat[0].complete_todo + 1
        
    
        STATISTIC.findByIdAndUpdate(id_stat, { $set: { complete_todo: complete_todo_plus } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                } else {
                    res.json(result);
                }
            }
        )
    })
}
// TEST CompleteSeil++

exports.NewCompleteSeil = async (req,res) =>{

    await STATISTIC.find().select("CompleteSeil _id").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
      
        let id_stat = stat[0]._id
        let CompleteSeil_plus = stat[0].CompleteSeil + 1
        
    
        STATISTIC.findByIdAndUpdate(id_stat, { $set: { CompleteSeil: CompleteSeil_plus } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                } else {
                    res.json(result);
                }
            }
        )
    })
}
// TEST
// SeilAll++
exports.NewCompleteSeilAll = async (req,res) =>{

    await STATISTIC.find().select("SeilAll _id").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log(stat[0].SeilAll)
        let id_stat = stat[0]._id
        let SeilAll_plus = stat[0].SeilAll + 1
        
    
        STATISTIC.findByIdAndUpdate(id_stat, { $set: { SeilAll: SeilAll_plus } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                } else {
                    res.json(result);
                }
            }
        )
    })
}
// differenceSeil ++
exports.NewCompleteSeilDiffence = async (req,res) =>{

    await STATISTIC.find().select("differenceSeil _id").exec((err, stat) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        console.log(stat[0].differenceSeil)
        let id_stat = stat[0]._id
        let differenceSeil_plus = stat[0].differenceSeil + 1
        
    
        STATISTIC.findByIdAndUpdate(id_stat, { $set: { differenceSeil: differenceSeil_plus } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    });
                } else {
                    res.json(result);
                }
            }
        )
    })
}
exports.DeleteUserQuality = async (req,res) =>{
    await STATISTIC.find().select(" worker_quality ").exec((err, stat) =>{
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
exports.GetUserQuality = async (req,res) =>{
    await STATISTIC.find()
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
