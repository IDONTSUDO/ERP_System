const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const morgan = require("morgan");
require("dotenv").config();
let port = 4000;
const E = require("./event/events");

const app = express();
app.use(cors()).use(morgan("dev"));
const server = app.listen(port, function() {
  console.log("server up and running on port " + port);
});
const io = socket(server);

io.on("connection", function(socket) {
  let token = socket.handshake.query;
  console.log(token)
});
