const webpush = require('web-push')
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)


exports.PushUsers = (req,res) =>{
  var subscription = req.body
  console.log(subscription.keys.auth)
  console.log(subscription)
 

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
exports.UserAddPushData = (req,res) =>{
  const payload = JSON.stringify({
    title: 'Оно работает',
    body: 'СуКА ЗАРАБОТАЙЫ',
  })
  const subscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/cO5s8y8iJ14:APA91bHKbvbC1aUyR2Aws4fKNq2U2T4_HmqCtMYOs-tfwWnImHu_jMWSZ--qjOMLXfYrImWe-qZ3NFSwwgCt72iNPNCe08ECB5WsTWD4TXh5__abV0RKA_WECJnpbx0qSeH7eDF0l3vc',
    keys: {
      p256dh: 'BGOCbIOaf4BG_xT1syGlx92uD34u8-YzcR8djnQaZHA2ugSR8II-CIcC9Gmzjtlf6TF0UlIvN0o8CMadDBHWD0E',
      auth: 'MNiHLgmgZfSMoHijsnfV7g'
    }
  };
  webPush.sendNotification(subscription, payload)
  .then(encryptionDetails => {
    console.log(encryptionDetails)
  })
  .catch(err => console.log(err))
  return res.status(200)
}