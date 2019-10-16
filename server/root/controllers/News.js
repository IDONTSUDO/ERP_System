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
exports.newNews = async(req,res) =>{
    const news = new NEWS(req.body) 
    await news.save().then(result =>{
        res.status(200).json({
            news: result
        })
    })
}

exports.readNews = async(req, res) =>{
    let worker = req.body.id
    await NEWS.find({worker_by:worker})  
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

exports.NewsSetDateDelete = async(req, res) =>{
    let NewsKill = req.news 

    NewsKill = _.extend(NewsKill, req.body)
    NewsKill.expireAt = Date.now()

    await NewsKill.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(result)
    });
}

exports.NewsKills  = async(req, res,next) =>{
    let NewsKill = req.news 
    await NEWS.find({worker_by:worker})  
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