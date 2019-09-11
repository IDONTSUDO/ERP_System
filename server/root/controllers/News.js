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