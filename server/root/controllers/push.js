
const q = require('q');
const webpush = require('web-push')
const Subscription = require("../database/Subscriber")
require("dotenv").config()

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

exports.CheckBrowserForSubscription = async (req, res, next) => {
  let userAgent = req.header('User-Agent')
  let UserId = req.body.userId

  Subscription.find({ UserAgent: userAgent, userBy: UserId }).exec((err, result) => {
    if (result[0] == undefined) {
      return next()
    } else {
      return false
    }
  })
}

exports.NewPushToObjectWorker = async (req, res) => {

  let reqPayload = req.body.payload

  let Users = reqPayload.tags

  const payload = {
    title: "CRM",
    message: "Для вас новое дело",
    url: req.newsLink,
    ttl: process.env.TTL_PUSH,
    data: "Для вас новое дело",
    tag: "Для вас новое дело"
  };
  for (let i = 0; Users.length > i; i++) {
    Subscription.find({ userBy: Users[i] }, (err, subscriptions) => {
      if (err) {
        res.status(500).json({
          error: 'Technical error occurred'
        });
      } else {
        let parallelSubscriptionCalls = subscriptions.map((subscription) => {
          return new Promise((resolve, reject) => {
            const pushSubscription = {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth
              }
            };

            const pushPayload = JSON.stringify(payload);

            const pushOptions = {
              vapidDetails: {
                subject: 'http://example.com',
                privateKey: process.env.PRIVATE_VAPID_KEY,
                publicKey: process.env.PUBLIC_VAPID_KEY
              },
              TTL: payload.ttl,
              headers: {}
            };
            webpush.sendNotification(
              pushSubscription,
              pushPayload,
              pushOptions
            ).then((value) => {

              resolve({
                status: true,
                endpoint: subscription.endpoint,
                data: value
              });
            }).catch((err) => {

              reject({
                status: false,
                endpoint: subscription.endpoint,
                data: err
              });
            });
          });
        });
        q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
          return
        });
      }
    });
  }
}

exports.NewPushToSetStatus = async (req, res) => {
  let reqPayload = req.body.payload
  let user = reqPayload.worker_by
  let MessageToReq = reqPayload.eventNews



  const payload = {
    title: "CRM",
    message: MessageToReq,
    url: "/news",
    ttl: process.env.TTL_PUSH,
    data: MessageToReq,
    tag: MessageToReq
  };

  Subscription.find({ userBy: user }, (err, subscriptions) => {
    if (err) {
      res.status(500).json({
        error: 'Technical error occurred'
      });
    } else {
      let parallelSubscriptionCalls = subscriptions.map((subscription) => {
        return new Promise((resolve, reject) => {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.keys.p256dh,
              auth: subscription.keys.auth
            }
          };

          const pushPayload = JSON.stringify(payload);

          const pushOptions = {
            vapidDetails: {
              subject: 'http://example.com',
              privateKey: process.env.PRIVATE_VAPID_KEY,
              publicKey: process.env.PUBLIC_VAPID_KEY
            },
            TTL: payload.ttl,
            headers: {}
          };
          webpush.sendNotification(
            pushSubscription,
            pushPayload,
            pushOptions
          ).then((value) => {

            resolve({
              status: true,
              endpoint: subscription.endpoint,
              data: value
            });
          }).catch((err) => {

            reject({
              status: false,
              endpoint: subscription.endpoint,
              data: err
            });
          });
        });
      });
      q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
        return
      });
    }
  });
}
exports.PushUsers = async (req, res) => {


  var subscription = req.body.subscription

  let ModelSubsc = new Subscription()
  ModelSubsc.userBy = req.body.userId
  ModelSubsc.endpoint = subscription.endpoint
  ModelSubsc.keys = subscription.keys
  ModelSubsc.UserAgent = req.header('User-Agent')
  ModelSubsc.save(req.body).then(data => {
    console.log(data)
  })

  res.status(200)
}

exports.UserFindPushData = () => {
  const subscription = req.body
}
exports.UserAddPushData = (req, res) => {
  return res.status(200)
}
exports.MyPushingDevice = async (req, res) => {
  let userBy = req.body
  Subscription.find(userBy).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }

    res.json(result)

  })
}
exports.NewPushingNotifycation = async (req, res) => {
  let Users = req.newsUser
  const payload = {
    title: "CRM",
    message: "Для вас новое дело",
    url: req.newsLink,
    ttl: process.env.TTL_PUSH,
    data: "Для вас новое дело",
    tag: "Для вас новое дело"
  };
  for (let i = 0; Users.length > i; i++) {
    Subscription.find({ userBy: Users[i].user }, (err, subscriptions) => {
      if (err) {
        res.status(500).json({
          error: 'Technical error occurred'
        });
      } else {
        let parallelSubscriptionCalls = subscriptions.map((subscription) => {
          return new Promise((resolve, reject) => {
            const pushSubscription = {
              endpoint: subscription.endpoint,
              keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth
              }
            };

            const pushPayload = JSON.stringify(payload);

            const pushOptions = {
              vapidDetails: {
                subject: 'http://example.com',
                privateKey: process.env.PRIVATE_VAPID_KEY,
                publicKey: process.env.PUBLIC_VAPID_KEY
              },
              TTL: payload.ttl,
              headers: {}
            };
            webpush.sendNotification(
              pushSubscription,
              pushPayload,
              pushOptions
            ).then((value) => {

              resolve({
                status: true,
                endpoint: subscription.endpoint,
                data: value
              });
            }).catch((err) => {

              reject({
                status: false,
                endpoint: subscription.endpoint,
                data: err
              });
            });
          });
        });
        q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
          return
        });
      }
    });
  }
}
exports.DeleteDevice = async (req, res) => {
  let id = req.body
  Subscription.findByIdAndRemove(id).exec((err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.status(200).json(result)
    }
  })
}
exports.DeleteDeviceByDuringExit = async (req, res, next) => {

  let userAgent = req.header('User-Agent')
  let UserId = req.auth
  Subscription.findOneAndRemove({ UserAgent: userAgent, userBy: UserId }).exec((err, result) => {
    if (err) {
      return res.json(404).json({ message: err })

    } else {
      return res.status(200).json({ message: "Sign Out Complite" })
    }
  })
}