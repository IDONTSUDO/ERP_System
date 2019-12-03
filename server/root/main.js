const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
const morgan = require('morgan')
require("dotenv").config()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const cors = require('cors')
const {CRONTEST} = require("./cron/cron.js")

const connectionString = 'mongodb://127.0.0.1/svarog-cron';

exports.AgendaTest = async (req, res) =>{

    const agenda = new Agenda({
        db: {address: process.env.CONNECTION_AGENDA, collection: 'ourScheduleCollectionName'},
        processEvery: '30 seconds'
    })
    agenda.on('start', job => {
        console.log(job)
        console.log('Job %s starting', job.attrs.name);
    });
    
}
var environment = process.env.NODE_ENV

console.log(environment)
CRONTEST()

mongoose.connect(`mongodb://localhost/svarog-crm-system`, { useNewUrlParser: true }).then(() => console.log("DB Conected"))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
mongoose.set('debug', true)

const DirectAuthRoutes = require("./routers/Auth")
const DirectCompanyhRoutes = require("./routers/Company")
const CommonTodoRoutes = require("./routers/todo")
const StatisticRouter = require("./routers/Statistic")
const NewsRouter = require("./routers/News")
const AgentRouter = require("./routers/ContAgent")
const NewHistory = require("./routers/AgentHistory")
const PriceUsers = require("./routers/Priced")
const PushNotifications = require("./routers/push")
// const CronTask = require("./routers/cron")


app.use(cookieParser())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())
// 
app.use("/", PushNotifications)
app.use("/", StatisticRouter)
app.use("/", DirectAuthRoutes)
app.use("/", DirectCompanyhRoutes)
app.use("/", NewsRouter)
app.use("/", AgentRouter)
app.use("/", NewHistory)
app.use("/", CommonTodoRoutes)
app.use("/", PriceUsers)


app.get('/docs', (req, res) => {
    fs.readFile('documentation/ApiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
})
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "unathorized!" })
    }
})
app.listen(port, () => console.log(`Server listening on port localhost:8080!`))