const zmq = require("zeromq");
require("dotenv").config();
const sock = new zmq.Push();
const {CounterUnread} = require("../controllers/Messages")
async function run() {
  await sock.bind("tcp://127.0.0.1:3000");
  console.log("Producer bound to port 3000");
  await new Promise(resolve => setTimeout(resolve, 500));
}
run();

module.exports.PUBLISHER = run;

exports.NewDialogSendWebSocketServer = async req => {
  let data = req.dilogData;
  let message = "ND";
  //New Dialog
  let payload = {
    data,
    message
  };
  sock.send(JSON.stringify(payload));
};

exports.EditMessageSendWebSocketServer = async req => {
  let message = "EM";
  let data = req.messageData;
  // Edit Message
  let payload = {
    data,
    message
  };
  sock.send(JSON.stringify(payload));
};
exports.DeleteMessageSendWebSocketServer = async req => {
  let message = "DM";
  // Delete Message
  let data = req.messageData;
  console.log(data);
  let payload = {
    data,
    message
  };
  sock.send(JSON.stringify(payload));
};

exports.NewMessageSendWebSocketServer = async (req,res,next) => {
  let message = "NM";
  // New Message

  let data = req.message;

  let payload = {
    data,
    message
  };
  sock.send(JSON.stringify(payload));
  return next()
};
