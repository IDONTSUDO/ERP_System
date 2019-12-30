let express = require('express');
let expressWs = require('express-ws')

let expressWsApp = expressWs(express());
const jwt = require("jsonwebtoken")
const event = require("./event/event.js")
const SUBSCRIPTION = require('./socket/subscription.js')

let port = 4041
let app = expressWsApp.app;


var aWss = expressWsApp.getWss('/a');
app.ws('/online', (ws, req) => {
    // console.log(ws)
    ws.id = req.headers['sec-websocket-key'];
    ws.jwt = req.headers['sec-websocket-protocol']
    if(ws.jwt === undefined){
        return console.log("Hello russia hackers")
    }


    let user = jwt.decode(ws.jwt)
    ws.user = user._id



    ws.on('message', msg => {
        event.handleJoin(ws,user)
    })
    ws.on('cloud', msg => {
        console.log("Clooud")
    })
    ws.on('close', msg => {
       event.handleLeave(ws,user)
    })
})
app.ws('/user', (ws, req) => {
    ws.on('message', msg => {
        let data = JSON.parse(msg)
        event.handleUserIsOnline(data.user,ws)
    })
})
app.ws('/messages',(ws,req) =>{
  
})

app.listen(port, () => console.log(`Server listening on port ws:localhost:${port}!`))

module.exports.clients = aWss.clients
