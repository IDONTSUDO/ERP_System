const EmailImg = require('../database/Images')
const EmailSnipet = require('../database/EmailSnipet')
exports.emailId = async (req, res,next,id) => {
    
    EmailImg.findById(id)
    .exec((err, result) => {
        if (err || !result) {
            return res.status(400).json({
                error: "Img not found"
            })
        }
        req.img = result
        next()
    })
}

exports.SnipetId = async (req, res,next,id) =>{

    EmailSnipet.findById(id)
    .exec((err, result) => {
      
        if (err || !result) {
            return res.status(400).json({
                error: "Snipets not found"
            })
        }
        req.snip = result
        
        next()
    })
}
exports.MailPaginationGetImage = async (req, res) => {
    const currentPage = req.query.page || 1

    const perPage = 24
    var totalItems

    const img = EmailImg.find()

        .countDocuments()
        .then(count => {
            totalItems = count;
            return EmailImg.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)

        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => console.log(err))
}
exports.MailDeleteCollection = async (req, res) => {
   let img =  req.img
  
    await img.remove((err, img) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "Img delete!" })
    })
} 

exports.SnipetsDelete = async (req,res) =>{
    let snip =  req.snip
  
    await snip.remove((err, snip) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({ message: "Snipet delete!" })
    })
}

exports.SaveEmailSnipet = async (req,res) =>{
//TODO Validation
    let {payload} = req.body
    let snip = new EmailSnipet(payload)

    snip.name = payload.snipetName
    snip.disign = payload.design 
    snip.dateCreated = Date.now()

    snip.save().then(result => {
        console.log(result)
        res.status(200).json({
            result
        })
    })
    
}
exports.getEmailSnipet = async (req,res) =>{
    const currentPage = req.query.page || 1
    const perPage = 50
    var totalItems

    const snipets = await EmailSnipet.find()

        .countDocuments()
        .then(count => {
            totalItems = count;
            return EmailSnipet.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)

        })
        .then(snipets => {
            res.status(200).json(snipets)
        })
        .catch(err => console.log(err))
}