const NEWS = require('../database/News')

exports.newNews = (req,res) =>{
    const news = new NEWS(req.body) 
    news.save().then(result =>{
        res.status(200).json({
            news: result
        })
    })
}

exports.readNews = (req, res) =>{
    let worker = req.body.id
    console.log(req.body.id)
    NEWS.find({worker_by:worker})  
    .select(" link event worker_by ")
    .exec((err, news) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        res.json(news)

    })
}

// dateCreated
exports.readNewsAndUpdate = (req, res,next) =>{
    
    let worker = req.body.id

    // console.log(req.body.id)
    NEWS.find({worker_by:worker})  
    .select(" _id")
    .exec((err, news) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }

        req.newsList = news
        next()
    })
}

exports.NewsKills  = (req, res,next) =>{
    // console.log(req.newsList)
    let NewsDelete = req.newsList
    let NewsNum = 0
function  Delete(NewsDelete,NewsNum){
    if(NewsDelete.length != NewsNum){
        console.log(NewsDelete[NewsNum]._id)
        WORKER.findByIdAndUpdate(NewsDelete[NewsNum]._id, { $set: { dateCreated: Date.now } }, { new: true }).exec(
            (err, result) => {
                if (err) {
                    return console.log(err)
                }
            }
        )
        NewsNum++
        return Delete(NewsDelete.length != NewsNum)
    }
  
}

Delete(NewsDelete,NewsNum)
    // NewsDelete.map((news, i) => (
        // WORKER.findByIdAndUpdate(news, { $set: { dateCreated: Date.now } }, { new: true }).exec(
        //     (err, result) => {
        //         if (err) {
        //             return console.log(err)
        //         }
        //     }
        // )
    // ))
    res.status(200).json("200OK")
}