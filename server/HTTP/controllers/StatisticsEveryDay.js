let StatisticsEveryDayAll = require("../database/Statistics/StatisticsEveryDay");
let Statistic = require("../database/Statistics/UserStatistic.js");
let Week = require("../database/Statistics/ActiveUserWeekDay")
let dateFormat = require("dateformat");
let moment = require("moment");

exports.NewStatistic = async (req, res) => {
  let UserId = req.auth;
  console.log(UserId);
  var dateTime = new Date();
  dateTime = moment(dateTime).format("YYYY-MM-DD");

  StatisticsEveryDayAll.find({ day: dateTime, userBy: UserId }).then(result => {
    if (result[0] === undefined) {
      const statistic = new StatisticsEveryDayAll();
      statistic.day = dateTime;
      statistic.userBy = UserId;
      statistic.save().then(result => {
        res.status(200).json(result);
      });
    } else {
      return res.status(200).json(result[0]);
    }
  });
};
exports.UpdateStatisticTodoComplete = async (req, res) => {
  let findId = req.body.statisticId;
  StatisticsEveryDayAll.findOneAndUpdate(
    { _id: findId },
    { $inc: { todo_complete: +1, value: +1 } }
  ).then(data => {
    res.status(200).json({ ok: "ok" });
  });
};
//
exports.UpdateStatisticTodoAssign = async (req, res) => {
  let findId = req.body.statisticId;
  let weekDay = req.body.statisticIdWeek
  StatisticsEveryDayAll.findOneAndUpdate(
    { _id: findId },
    { $inc: { assigned_todo: +1, value: +1 } }
  ).then(data => {
    console.log(data);

    res.status(200).json({ ok: "ok" });
  });
};
//
exports.UpdateStatisticCommentResult = async (req, res) => {
  let findId = req.body.statisticId;
  StatisticsEveryDayAll.findOneAndUpdate(
    { _id: findId },
    { $inc: { comment: +1, value: +1 } }
  ).then(data => {
    res.status(200).json({ ok: "ok" });
  });
};

exports.GetAllStatistic = async (req, res) => {
  let userId = req.body.userId;
  Statistic.find({ Userby: userId }).then(data => {
    if(data[0] === undefined){
      return res.status(200).json([])
    }else{
      if(data[0].day === undefined){
        return res.status(200).json([])
      }else{
        return res.status(200).json(data[0].day);
      }
    }
  });
};
