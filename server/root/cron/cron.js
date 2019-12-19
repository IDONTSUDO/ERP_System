const cron = require('node-cron');
const Todo = require('../database/UserTodo')
const StatisticsEveryDay = require('../database/StatisticsEveryDay')
const UserStatistic = require('../database/UserStatistic.js')
const  moment = require('moment')

module.exports.CRONTEST = function () {
  let timeFind = moment().locale("ru").format("LL")

//   cron.schedule('*/1 * * * *', () => {
//     Todo.find({ time: timeFind,comand:false })
//     .exec((err, result) => {
//         if (err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         console.log(result)
//         console.log(result[0].posted_by)
//         console.log(result[0].tags)
//     })
//   })

let d = new Date();
let curr_date = d.getDate() 
let curr_month = d.getMonth() + 1
let curr_year = d.getFullYear()

let times =  `${curr_year}-${curr_month}-${curr_date}`
  cron.schedule('*/1 * * * *', () => {
    StatisticsEveryDay.find({ day: times })
    .exec((err, result) => {
        if (err) {
            console.log("err",err)
        }else{
             console.log("res",result)
             for (let value of result) {
                UserStatistic.findOneAndUpdate({UserBy: value.userBy},{ $push: { day: value } },
                    (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(result)
                    }
                );
              }
             for(let i = 0;result > i;i++){
                console.log(result[0])
               
                // UserStatistic.findOneAndUpdate({UserBy: result[i].userBy},{ $push: { day: result[i] } },
                //     (err, result) => {
                //         if (err) {
                //             console.log(err)
                //         }
                //         console.log(result)
                //     }
                // );
               
            }
        }
        // console.log(result)
        
    })
  })
};



// Useronestatistics.findAndUpdate(
//     {UserBy: result[i].userBy},
//      { $push: { folldowing: req.body.followId } },
//      (err, result) => {
//          if (err) {
//              return res.status(400).json({ error: err });
//          }
//          next();
//      }
//  );