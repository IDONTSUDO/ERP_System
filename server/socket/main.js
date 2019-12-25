const express = require('express')
const enableWs = require('express-ws')
const jwt = require("jsonwebtoken")
const event = require("./event/event.js")
let port = 4041
const app = express()
enableWs(app)

const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost/svarog-crm-socket`, { useNewUrlParser: true }).then(() => console.log("DB Conected"))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
mongoose.set('debug', true)


app.ws('/online', (ws, req) => {
    // console.log(ws)
    ws.id = req.headers['sec-websocket-key'];
    ws.jwt = req.headers['sec-websocket-protocol']
    if(ws.jwt === undefined){
        return console.log("Hello russia hackers")
    }


    let user = jwt.decode(ws.jwt)
    



    ws.on('message', msg => {
        console.log(msg)
        event.handleJoin(ws,user)
    })
    ws.on('close', msg => {
        console.log(msg)
       event.handleLeave(ws,user)
    })
})
app.ws('/user', (ws, req) => {
    ws.on('message', msg => {
        let data = JSON.parse(msg)
        event.handleUserIsOnline(data.user,ws)
    })
})


app.listen(port, () => console.log(`Server listening on port ws:localhost:${port}!`))
