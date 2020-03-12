const NEWS = require('../database/News')
const TODO = require('../database/UserTodo.js')
const _ = require('lodash')
require("dotenv").config()
exports.NewsId = async (req, res, next, id) => {
    NEWS.findById(id)
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
exports.newNews = async (req, res, next) => {
    //    dateCreated
    let payload = req.body.payload
    let users = payload.worker_by 
    let NewsTO = ""
    
    if(users.length === undefined){
        const news = new NEWS(payload)
        news.NewsTO =  users.user
        news.dateCreated = Date.now()
        news.save().then(result => {
           
        })
    }else{
        for (let i = 0; i < users.length; i++) {
          
            const news = new NEWS(payload)
            news.NewsTO = users[i].user
            news.dateCreated = Date.now()
            news.save().then(result => {
              
            })
        }
    }
    res.status(200).json({
        "result": "created"
    })
}

exports.NewTodoo = async (req, res, next) => {
    
    const todo = new TODO(req.body)
    todo.postedBy = req.worker
    todo.save().then(result => {
        req.result._id
        next()
    })
    const news = new NEWS(req.body)
    
    news.save().then(result => {
        req.new = result._id
        next()
    })
}
exports.SetNews = async (req, res, next) => {
   
    
    let users = req.newsUser

    for (let i = 0; users.length > i; i++) {
        const news = new NEWS(req.body)
        news.link = req.newsLink
        news.NewsTO = users[i].user
        news.save().then(result => { console.log("NEWS LIST"),console.log(result)})
    }
    res.status(200).json({ "result": "created" })
    next()
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
    NEWS.find({ NewsTO: worker  })
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
    NEWS.find({ worker_by: worker })
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