let express = require('express')
let app = express();
let port = 4001
let server = require('http').createServer(app).listen(port);
let event = require('./event/event.js')

let io = require('socket.io').listen(server);
const jwt = require("jsonwebtoken")
require("dotenv").config()




io.on('connection', function (socket) {
    console.log("new connect")
    // let token = socket.handshake.query.token

    // let decod = jwt.decode(token)
   
    socket.on('conect', function (data) {
      console.log("c")
      
        // event.handleJoin(io, socket, decod)
    });    
    socket.on('user', function (data) {
        console.log("u")
        // let req = data
        // console.log("its",req)
    })
    socket.on('disconnect', function (data) {
        console.log("d")
        // event.handleLeave(decod)
    });

});

