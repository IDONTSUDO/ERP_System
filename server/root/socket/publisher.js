 
const zmq = require("zeromq")
require("dotenv").config()
const sock = new zmq.Push

 
async function run() {
  await sock.bind("tcp://127.0.0.1:3000") 
  console.log("Producer bound to port 3000")
    await new Promise(resolve => setTimeout(resolve, 500))
  }
run()


module.exports.PUBLISHER = run 
   
exports.NewMessageSendWebSocketServer = async (req) => {
    
}
exports.NewDialogSendWebSocketServer = async (req) => {
   let data =  req.dilogData 
   let message = "ND"
   //message = Новый диалог
    let payload = {
      data,
      message
    } 
   sock.send(JSON.stringify(payload)) 

}

