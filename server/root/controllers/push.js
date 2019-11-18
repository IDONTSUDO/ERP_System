const webpush = require('web-push')
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)


exports.PushUsers = (req,res) =>{
  var subscription = req.body

 

  const payload = JSON.stringify({
    title: 'Оно работает',
    body: 'Ура',
  })
  let resultkey = subscription.keys.p256dh
 webpush.sendNotification(subscription, payload)
  .then(result => console.log())
  .catch(e => console.log(e.stack))
  
  console.log("itsresult", resultkey)
  res.status(200).json(resultkey)
}

exports.UserFindPushData = () =>{
  const subscription = req.body
  
  console.log(subscription.keys.p256dh)
}
exports.UserAddPushData = () =>{

}