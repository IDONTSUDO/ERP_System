const Chanel = require('../database/Chanel')
const Message = require('../database/Message')
const _ = require('lodash')


exports.MessageId = async (req, res,next,id) =>{
    Message.findById(id)
    .exec((err, result) => {
        if (err || !result) {
            return res.status(400).json({
                error: "Message not found"
            })
        }
        req.message = result

        next()
    })
}


exports.ChanelList = async (req, res) =>{
    let userId = req.body.userId
    const currentPage = req.query.page || 1
    const perPage = 10
    var totalItems

    const chanels = await Chanel.find({User:userId})

        .countDocuments()
        .then(count => {
            totalItems = count;
            return Chanel.find({User:userId})
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
         
        })
        .then(data => {
            console.log(data)
            
              let requests = data.map(one => Message.find({DialogId:one._id})
            //   .last()
              .sort({'_id':-1}).limit(1)
              .then(data =>{ return ({message:data,dialog:one})}));
              
        
              Promise.all(requests)
                .then(responses =>  res.status(200).json(responses))

        })
        .catch(err => console.log(err))
}
exports.GetMessages = async (req, res) =>{

}
exports.ChanelNew = async (req, res,next) =>{
    const chanel = new Chanel(req.body)

    chanel.save().then(result => {
        res.status(200).json({
            result
        })
        req.dilogData = result
        return next()
    })
}
exports.ChanelDelete = async (req, res) =>{

}
exports.newMessage = async (req, res) =>{
    const message = new Message(req.body)

    message.save().then(result => {
        res.status(200).json({
            result
        })
    })
}
exports.EditMessage = async (req, res) =>{
   let msg = req.message

   msg = _.extend(msg, req.body)


   await msg.save((err, result) => {

       if (err) {
           return res.status(400).json({
               error: err
           })
       }

       res.json(result)
   })
}

exports.DeleteMessage = async (req, res) =>{
   let msg = req.message
    msg.remove().then( data=>{
        return res.status(200).json(data)
    })
}
exports.ChanelGetDialog = async (req, res) =>{
    const currentPage = req.query.page || 1
    const dialogsId = req.body.dialogsId
    const perPage = 50
    var totalItems

    const dialogs = Message.find({DialogId:dialogsId})

        .countDocuments()
        .then(count => {
            totalItems = count;
            return Message.find({DialogId:dialogsId})
                .skip((currentPage - 1) * perPage)
                .limit(perPage)

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}