const cron = require('node-cron');
const Todo = require('../database/UserTodo')
const StatisticsEveryDay = require('../database/StatisticsEveryDay')
const UserStatistic = require('../database/UserStatistic.js')

module.exports.CRON = function () {
let d = new Date();
let curr_date = d.getDate() 
let curr_month = d.getMonth() + 1
let curr_year = d.getFullYear()
let times =  `${curr_year}-${curr_month}-${curr_date}`
// '0 1 * * *
  cron.schedule('0 1 * * *', () => {
    StatisticsEveryDay.find({ day: times })
    .exec((err, result) => {
        if (err) {
            console.log("err",err)
        }else{
            
              for (let value of result) {
                console.log(value._id)

                UserStatistic.findOneAndUpdate({ Userby: value.userBy}, { $push: { day: value },  },function (error, success) {
                       if (error) {
                           console.log(error);
                       } else {
                           console.log(success);
                           StatisticsEveryDay.deleteMany({_id:value._id}).then((err,result) =>{
                             if(err){
                               console.log(err)
                             }else{
                               console.log(result)
                             }
                           })
                       }
                   })
               
              }
        }      
    })
  },{
    scheduled: true,
    timezone: "Europe/Moscow"
  })
}
// ,{
//   scheduled: true,
//   timezone: "Europe/Moscow"
// }

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
