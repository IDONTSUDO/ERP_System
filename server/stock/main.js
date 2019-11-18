const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

mongoose.connect(`mongodb://localhost/svarog-stock-system`, { useNewUrlParser: true }).then(() => console.log("DB Conected"))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
mongoose.set('debug', true)

const test = require("./routers/test.integration.js")
app.use(cookieParser())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())

app.use("/", test)




app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "unathorized!" })
    }
})
app.listen(port, () => console.log(`Server listening on port localhost:8080!`))
