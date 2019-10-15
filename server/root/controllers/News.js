const NEWS = require('../database/News')
const _  = require('lodash')

exports.NewsId = async (req, res, next , id) =>{
    await NEWS.findById(id)
    .exec((err, news)=>{
        if(err || !news){
            return res.status(400).json({
                error: "News not found"
            })
        }
        req.news  = news
        
        next()
    })
}
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

exports.NewsSetDateDelete = (req, res) =>{
    let NewsKill = req.news 

    NewsKill = _.extend(NewsKill, req.body)
    NewsKill.expireAt = Date.now()

    NewsKill.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result)
    });
}

exports.NewsKills  = (req, res,next) =>{
    let NewsKill = req.news 
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