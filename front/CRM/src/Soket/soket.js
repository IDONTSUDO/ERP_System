import io from "socket.io-client";
import { isAuthenticated} from "../Api/Auth"


const jwt = isAuthenticated().token
const UserId = isAuthenticated()._id



export const testSoket = () => {

  const socket = io.connect(`${process.env.REACT_APP_SOKET_URI}`, { query: {token: jwt}})
  socket.on('connect', function() {
    console.log("Client is Connected");
  });
  
  socket.on('pong', function(data) {
    console.log('Received Pong: ', data);
  });
   socket.on('disconnect', function(data) {
    console.log('Received Pong: ', data);
  });

  setInterval(() => socket.emit('ping',"ping"), 2000);

}

export const isOnline = () =>{
  const socket = io.connect(`${process.env.REACT_APP_SOKET_URI}`, { query: {token: jwt}})
  socket.on('userIsOnline', function(data) {
    console.log("Client is Connected");
  });
}