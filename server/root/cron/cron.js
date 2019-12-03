const cron = require('node-cron');
const Todo = require('../database/UserTodo')

const  moment = require('moment')

module.exports.CRONTEST = function () {
  let timeFind = moment().locale("ru").format("LL")

  cron.schedule('*/1 * * * *', () => {
    Todo.find({ time: timeFind,comand:false })
    .exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        console.log(result)
        console.log(result[0].posted_by)
        console.log(result[0].tags)
    })
  })
};