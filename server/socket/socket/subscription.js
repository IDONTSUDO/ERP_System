const {NewDialog} = require('../controller/socket.controller.js')

const zmq = require("zeromq")
const sock = new zmq.Pull
async function run() {
  

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Worker connected to port 3000")

  for await (const [msg] of sock) {  
    let jsonTcp = msg.toString()
 
    let message = JSON.parse(jsonTcp)
  
    switch (message.message) {
      case "ND": //новый диалог
        NewDialog(message)
        break;
      case 4:
        console.log( 'В точку!' );
        break;
      case 5:
        console.log( 'Перебор' );
        break;
      default:
        console.log( "Нет таких значений" );
    }
  }
}

run()
module.exports.SUBSCRIPTION = run 