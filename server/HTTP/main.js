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
const Fawn = require('fawn')
// const PUBLISHER = require('./socket/publisher.js')

const Promise = require("bluebird");
const moment = require('moment')




Promise.promisifyAll(require("mongoose"));

mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`,{ useUnifiedTopology: true,  useNewUrlParser: true,  useCreateIndex :  true ,  poolSize: 10  }).then(() =>  console.log(`Server connect to Database ${process.env.DATABASE}`))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})


if(`${process.env.DEBUG_Mode}` === "true"){
    mongoose.set("debug", true);
    app.use(morgan('tiny'))

}


Fawn.init(mongoose);
// PUBLISHER
const DirectAuthRoutes = require("./routers/Auth")
const DirectCompanyhRoutes = require("./routers/Company")
const CommonTodoRoutes = require("./routers/todo")
const NewsRouter = require("./routers/News")
const AgentRouter = require("./routers/ContAgent")
const NewHistory = require("./routers/AgentHistory")
const PriceUsers = require("./routers/Priced")
const PushNotifications = require("./routers/push")
const Mail = require("./routers/mail.js")
const StatisticsEveryDay = require("./routers/StatisticsEveryDay.js")
const Messages = require("./routers/Message.js")
const Integration = require("./routers/Integration.js")
const StaticEnterprise = require('./routers/StatisticEnterprise.js') 
const Tech = require("./routers/TechAgent.js")
const ActiveUser = require("./routers/ActiveUsers.js")
const AgentHuman = require('./routers/HumanAgent')
const EnterPrise = require("./routers/Enterprise")
app.use(cors())


app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressValidator())

// 
// app.use("/",logger)
app.use("/", EnterPrise)

app.use("/", PushNotifications)
app.use("/", DirectAuthRoutes)
app.use("/", DirectCompanyhRoutes)
app.use("/", NewsRouter)
app.use("/", AgentRouter)
app.use("/", NewHistory)
app.use("/", CommonTodoRoutes)
app.use("/", PriceUsers)
app.use("/", Mail)
app.use("/",StatisticsEveryDay)
app.use("/",Messages)
app.use("/",Integration)
app.use("/",StaticEnterprise)
app.use("/",Tech)
app.use("/",ActiveUser)
app.use('/',AgentHuman)
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

app.use(express.static('uploads'))

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "unathorized!" })
    }
})
app.listen(port, () => console.log(`Server listening on port localhost:8080!`))