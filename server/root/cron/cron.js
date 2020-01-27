const cron = require('node-cron');
const Todo = require('../database/UserTodo')
const News = require('../database/News')

const StatisticsEveryDay = require('../database/StatisticsEveryDay')
const UserStatistic = require('../database/UserStatistic.js')
const moment = require('moment')

function CRON_STATISTIC() {
  var dateTime = new Date();
  dateTime = moment(dateTime).format("YYYY-MM-DD");
  // 0 1 * * *
  cron.schedule('0 1 * * *', () => {
    StatisticsEveryDay.find({ day: dateTime })
      .exec((err, result) => {
        if (err) {
          console.log("err", err)
        } else {
         
          for (let value of result) {
            UserStatistic.findOneAndUpdate({ Userby: value.userBy }, { $push: { day: value }, }, function (error, success) {
              if (error) {
                console.log(error);
              } else {
                console.log(success);
                StatisticsEveryDay.deleteMany({ _id: value._id }).then((err, result) => {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log(result)
                  }
                })
              }
            })

          }
        }
      })
  })
}
// , {
//   scheduled: true,
//   timezone: "Europe/Moscow"
// }


function CRON_USER_TODO() {
  let timeFind = moment().locale("ru").format("LL")

  cron.schedule('0 0 * * *', () => {
    Todo.find({ time: timeFind, comand: false })
      .exec((err, result) => {
        if (err) {
          return console.log(err)
        }
        if (result[0] === undefined) {
          return
        } else {
          let eventNews = "Не выполененое дело"
          let descriptionArray = result[0].names_workers_list
          let link = result[0]._id

          let worker_by = []
          worker_by.push({ user: `${result[0].posted_by}` })
          let payload = {
            eventNews,
            descriptionArray,
            link,
            worker_by
          }
  
        
          const news = new News(payload)
          news.dateCreated = Date.now()
          news.save().then(result => {
            return
          })
        }
      })
  }, {
      scheduled: true,
      timezone: "Europe/Moscow"
    })
}




module.exports.Cron = function () {
  console.log("CRON START")
  CRON_USER_TODO()
  CRON_STATISTIC()
}
