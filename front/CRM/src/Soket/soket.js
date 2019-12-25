import io from "socket.io-client";
import { isAuthenticated} from "../Api/Auth"


const jwt = isAuthenticated().token
const UserId = isAuthenticated()._id

var socket = io.connect(`${process.env.REACT_APP_SOKET_URI}`, { query: {token: jwt}})


export const testSoket = () => {

  socket.on('conect', function() {
    console.log("Client is Connected");
  });
  
  socket.on('disconnect', function(data) {
    console.log('disconnect', data);
  });

  // setInterval(() => socket.emit('ping',"ping"), 2000);

}

export const isOnline = (user) =>{
  socket.on('user', function(data) {
    console.log("soket data",data)
  })
}