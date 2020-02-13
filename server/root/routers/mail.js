const express = require("express")
const {
  emailId,
  MailPaginationGetImage,
  MailDeleteCollection,
  SaveEmailSnipet,
  getEmailSnipet,
  SnipetId,
  SnipetsDelete,
  getDisign
} = require("../controllers/mail.images")
let ImagesMail = require("../database/Images")

let multer  = require('multer')
let upload = multer({ dest: 'uploads/' })

const router = express.Router({mergeParams: true});

router.post('/photos/upload', upload.single('email'), (req, res) => {
    try {
      let file = req.file

      if(file === undefined){
        return res.sendStatus(400).json({err:err})
      }else{
        const imagesSave = new ImagesMail(file)

        imagesSave.save().then((result,err) =>{ 
           if(err){
            
            return res.status(400).json({err:err})
           }else{
                return res.status(200).json(result)
           }
       }) 
      }
    }catch(err) {
      res.send(400).json({err})
    }
})
router.post('/save/email/snipets',SaveEmailSnipet)


router.get('/get/email/snipet',getEmailSnipet)
router.get('/images/email/all',MailPaginationGetImage)
router.get('/get/disign/:snipetId',getDisign)


router.delete('/images/del/:emailId',MailDeleteCollection)
router.delete('/snipets/delete/:snipetId',SnipetsDelete)

router.param('emailId',emailId)
router.param('snipetId',SnipetId)

module.exports = router