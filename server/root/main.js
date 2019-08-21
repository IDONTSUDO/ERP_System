const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const cors = require('cors')
dotenv.config()




mongoose.connect(`mongodb://localhost/svarog-crm-system`, {useNewUrlParser: true}).then(() =>console.log("DB Conected"))
mongoose.connection.on('error', err =>{
    console.log(`DB connection error: ${err.message}`)
})
mongoose.set('debug', true)

const DirectAuthRoutes = require("./routers/direct/auth")

app.use(cookieParser())
app.use(morgan ("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())

// ROUTERS
app.use("/", DirectAuthRoutes)

app.get('/docs',(req,res) =>{
    fs.readFile('documentation/ApiDocs.json', (err,data) =>{
        if(err){
            res.status(400).json({
                error:err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
})

app.use(function (err, req,res,  next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error: "unathorized!"})
    }
})
app.listen(port, () => console.log(`Server listening on port localhost:8080!`))
