const express = require("express")
const {
  MailPaginationGetImage,
  MailDeleteCollection} = require("../controllers/mail.images")
let ImagesMail = require("../database/Images")

let multer  = require('multer')
let upload = multer({ dest: 'uploads/' })

const router = express.Router({mergeParams: true});

router.post('/photos/upload', upload.single('email'), (req, res) => {
    try {
        let file = req.file
        const imagesSave = new ImagesMail(file)

        imagesSave.save().then((result,err) =>{ 
           if(err){
            
            return res.status(400).json({err:err})
           }else{
                return res.status(200).json(result)
           }
       })
    }catch(err) {
      res.send(400).json({err})
    }
})
router.get('/images/email/all',MailPaginationGetImage)
router.delete('/images/del',MailDeleteCollection)

module.exports = router