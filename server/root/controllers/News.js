const NEWS = require('../database/News')
const TODO = require('../database/UserTodo.js')
const _ = require('lodash')
require("dotenv").config()
exports.NewsId = async (req, res, next, id) => {
    await NEWS.findById(id)
        .exec((err, news) => {
            if (err || !news) {
                return res.status(400).json({
                    error: "News not found"
                })
            }
            req.news = news

            next()
        })
}
exports.newNews = async (req, res) => {
  
    const news = new NEWS(req.body)
    await news.save().then(result => {
        res.status(200).json({
            "result": "created"
        })
    })
}

exports.NewTodoo = async (req, res,next) => {
    const todo = new TODO(req.body)
    todo.postedBy = req.worker
    
    todo.save().then(result => {
        req. result._id
        
        next()
    })

    const news = new NEWS(req.body)
    news.save().then(result => {
    req.new = result._id
    next()
    })
}
exports.SetNews = async (req, res, next) =>{
    // req.newsLink
  const news = new NEWS(req.body)
  news.link = req.newsLink
  await news.save().then(result => {
      res.status(200).json({
          "result": "created"
      })
  })
}
exports.NewsDelete = async (req, res) => {
    let news = req.news;
    await news.remove((err, news) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "news delete"
        });
    });
}
exports.readNews = async (req, res) => {
    let worker = req.body.id
    NEWS.find(  { worker_by: { $elemMatch: { user: worker } } })
        .exec((err, news) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json(news)

        })
}
exports.readNewsQuality = async (req, res) => {
   
    let worker = req.body.userId
    NEWS.count({ worker_by: worker })
        .exec((err, news) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(news)
        })
}
exports.NewsSetDateDelete = async (req, res) => {
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

exports.NewsKills = async (req, res, next) => {
    let NewsKill = req.news
    await NEWS.find({ worker_by: worker })
        .select(" _id")
        .exec((err, news) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            req.newsList = news
            next()
        })
}