let express = require('express');
let expressWs = require('express-ws')

let expressWsApp = expressWs(express());
const jwt = require("jsonwebtoken")
const event = require("./event/event.js")
const SUBSCRIPTION = require('./socket/subscription.js')

let port = 4041
let app = expressWsApp.app;


var aWss = expressWsApp.getWss('/a');
app.ws('/online/:token', (ws, req) => {
    
   
    let jwtToken = req.params 
    
    // ws.id = req.headers['sec-websocket-key'];
    // ws.jwt = req.headers['sec-websocket-protocol']
    // if(ws.jwt === undefined){
        // return console.log("Hello russia hackers")
    // }


    let user = jwt.decode(jwtToken.token)
    if(user === null){
        return ws.close() 
    }

    ws.userId = user._id

    ws.on('onmessage', msg =>{
        console.log(msg)
    })
    ws.on('message', msg => {
        console.log(200)
        ws.send('subscribe')
        console.log("subscribe")
        // event.handleJoin(ws,user)
    })
    ws.on('cloud', msg => {
        console.log("Clooud")
    })
    ws.on('close', msg => {
    //    event.handleLeave(ws,user)
    })
})
app.ws('/user', (ws, req) => {
    ws.on('onmessage',msg =>{
        console.log(200)
        console.log(msg)
    })
    ws.on('message', msg => {
       
        ws.send('subscribe')
        console.log("subscribe")
        // event.handleUserIsOnline(data.user,ws)
    })
    ws.on('onclose', msg =>{
        console.log(400)
    })
    ws.on('close', function() {
        console.log(400)
      });
})
app.listen(port, () => console.log(`Server listening on port ws:localhost:${port}!`))

module.exports.clients = aWss.clients
