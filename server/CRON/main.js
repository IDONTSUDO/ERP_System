const express = require("express");
require("dotenv").config();
const app = express();
const port = 5006;
const mongoose = require("mongoose");
const Promise = require("bluebird");
const cron = require("node-cron");
require("dotenv").config();
const ActiveUserWeekDay = require("./database/ActiveUserWeekDay.js")
const Todo = require(`./database/UserTodo`);
const News = require(`./database/News`);
const ManageTaskAtAgentCron = require(`./database/CronTaskAtAgent`);
const StatisticsEveryDay = require(`./database/StatisticsEveryDay`);
const UserStatistic = require(`./database/UserStatistic.js`);
const Comapany = require("./database/Company.js")
const moment = require("moment");

mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 10
  })
  .then(() =>
    console.log(`CRON connect to Database ${process.env.DATABASE}`)
  );
mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});
if(`${process.env.DEBUG_Mode}` === "true"){
    mongoose.set("debug", true);
}
mongoose.Promise = Promise;

function CRON_STATISTIC() {
  var dateTime = new Date();
  dateTime = moment(dateTime).format("YYYY-MM-DD");
  cron.schedule(
    // 0 1 * * *
    "0 1 * * *",
    () => {
      console.log(200);
      StatisticsEveryDay.find({ day: dateTime }).exec((err, result) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log(result);
          for (let value of result) {
            console.log(value);
            if (value) {
              if (value.value === 0) {
                return;
              } else {
                UserStatistic.findOneAndUpdate(
                  { Userby: value.userBy },
                  { $push: { day: value } },
                  function(error, success) {
                    StatisticsEveryDay.deleteMany({ _id: value._id });
                  }
                );
              }
            }
          }
        }
      });
    },
    {
      scheduled: true,
      timezone: "Europe/Moscow"
    }
  );
}

function CRON_USER_TODO() {
  let timeFind = moment()
    .locale("ru")
    .format("LL");

  cron.schedule(
    "0 1 * * *",
    () => {
      Todo.find({ time: timeFind, comand: false }).exec((err, result) => {
        if (err) {
          return console.log(err);
        }
        if (result[0] === undefined) {
          return;
        } else {
          let eventNews = "Не выполененое дело";
          let descriptionArray = result[0].names_workers_list;
          let link = result[0]._id;

          let worker_by = [];
          worker_by.push({ user: `${result[0].posted_by}` });
          let payload = {
            eventNews,
            descriptionArray,
            link,
            worker_by
          };

          const news = new News(payload);
          news.dateCreated = Date.now();
          news.save().then(result => {
            return;
          });
        }
      });
    },
    {
      scheduled: true,
      timezone: "Europe/Moscow"
    }
  );
}

function CRON_MANAGE_TASK_AT_AGENT() {
  cron.schedule("0 1 * * *", () => {
    let PlaningDateMoment = new Date();
    // +1 day
    PlaningDateMoment.setDate(PlaningDateMoment.getDate() + 1);

    let dateMoment = moment(PlaningDateMoment).format("YYYY-MM-DD");
    ManageTaskAtAgentCron.find({ PlanningDate: dateMoment }).then(data => {
      let DateToday = Date.now();
      console.log(data)
      let MomentTime = moment(DateToday)
        .locale("ru")
        .format("LL");

      let status = "system";
      let descriptionTodo = "TESTING";

      let mounth = moment(DateToday)
        .locale("ru")
        .format("MM");
      let year = moment(DateToday)
        .locale("ru")
        .format("YY");
      for (let agentCron of data) {
        let tod = new Todo();
        tod.cronId = agentCron._id;
        tod.title = agentCron.agent.name;
        tod.description = descriptionTodo;
        tod.time = MomentTime;
        tod.tags = agentCron.UserId[0]._id;
        tod.status = status;
        tod.agent = agentCron.agent;
        tod.mounth = mounth;
        tod.year = year;
        tod.importance = "Очень важное";
        tod.Date = new Date();
        tod.save();
      }
      for (let i of data)
        ManageTaskAtAgentCron.remove({ _id: i._id }).then(data =>
          console.log(data)
        );
    });
  });
}
function everyWeekUserActive() {
    cron.schedule("* * * * *", () => {
        // Ищет всех кто состоит в компании и возвращает их ObjectId
        let WEEK = moment().isoWeek()

        let YEAR = moment()
        .locale("ru")
        .format("YY");
       
        Comapany.find({})
        .select(" _id name")
        .then(data =>{
            console.log(data)
            for(i of data){
                console.log(i)
                let Active = new ActiveUserWeekDay()
                Active.userId = i._id
                Active.name = i.name
                Active.week = WEEK 
                Active.year = YEAR
                Active.save()
            }
        })
    })
}
everyWeekUserActive()
CRON_MANAGE_TASK_AT_AGENT();
CRON_STATISTIC();
CRON_USER_TODO();
app.listen(port, () => console.log(`CRON START on localhost:${port}!`));

