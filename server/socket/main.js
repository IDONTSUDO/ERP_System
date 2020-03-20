const dotenv = require("dotenv");
let Online = require("./database/Online");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const zmq = require("zeromq");
const sock = new zmq.Pull();
const socket = require("socket.io");
const morgan = require("morgan");
// require("./socket-mq/subscription");
const mongoose = require("mongoose");

const {
  newSocketSession,
  deleteSocketSession
} = require("./controller/socket.controller");

mongoose
  .connect(`mongodb://localhost/${process.env.DATABASE_SOCKET}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 25
  })
  .then(() =>
    console.log(`Server connect to Database ${process.env.DATABASE_SOCKET}`)
  );
mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

const app = express();

if (`${process.env.DEBUG_Mode}` === "true") {
  mongoose.set("debug", true);
  app.use(morgan("tiny"));
}

let port = 4000;

app.use(cors());

const server = app.listen(port, function() {
  console.log("server up and running on port " + port);
});
const io = socket(server);
io.on("connection", function(socket) {
  let header = socket.handshake.query;
  socket.on("messages", reason => {
    console.log("messages");
  });
  socket.on("chat", interval => {
    newSocketSession(socket, header.session, header.id);
    // io.sockets.to("message");
    Online.find({}).then(data => {
      for (let user of data) {
        io.to(`${user.io_id}`).emit("message", "I just met you");
      }
      console.log(data[0].io_id);
    });

    //  io.to(`${socketId}`).emit('hey', 'I just met you');
  });
  socket.on("disconnect", reason => {
    deleteSocketSession(socket, header.session, header.id);
  });
  socket.on("reconnect", attemptNumber => {
    console.log("reconnect");
  });
});
process.once("SIGINT", function(code) {
  Online.deleteMany({}).then(data => {
    console.log(data);
  });
  server.close();
});
process.once("SIGTERM", function(code) {
  Online.deleteMany({}).then(data => {
    console.log(data);
  });
  server.close();
});
async function SocketBroadCastNewDialog(message) {
  let { users } = message.data;

  for await (let user of users) {
    Online.find({ user: user }).then(data => {
      for (let us of data) {

        io.to(`${us.io_id}`).emit("message", message);
      }
    });
  }
}
async function SocketBroadCasrNewMessage(message) {
  let { userBy } = message.data;
  for await (let user of userBy) {
    Online.find({ user: user }).then(data => {
      for (let us of data) {
        io.to(`${us.io_id}`).emit("message", message);
      }
    });
  }
}
async function SocketBroadCastDeleteDialog (message){

}
async function SocketBroadCastDeleteMessage(message){
  
}
async function Subscribers() {
  sock.connect(`tcp://${process.env.SUBSCRIBER}`);

  for await (const [msg] of sock) {
    let jsonTcp = msg.toString();

    let message = JSON.parse(jsonTcp);

    switch (message.message) {
      case "ND": //новый диалог
        SocketBroadCastNewDialog(message);
        break;
      case "EM": //изменение сообщеня
        console.log("В точку!");
        break;
      case "DM": //удаление сообщения
        console.log("Перебор");
        SocketBroadCastDeleteMessage(message)
        break;
      case "NM": //новое сообщение
        SocketBroadCasrNewMessage(message);
        console.log("NM");
        break;
      case "DD":
        SocketBroadCastDeleteDialog(message)
        console.log("DD");
      default:
        console.log("System glitch ");
    }
  }
}

Subscribers();
