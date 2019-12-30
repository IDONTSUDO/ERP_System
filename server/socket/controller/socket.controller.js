const clients =require('../main')

exports.NewDialog = (message) =>{

   let users = message.data.User
  
 
clients.clients.forEach(function (client) {
 console.log(client)
    for (let num of users) {
       console.log("Socket",client.user)
       if(client.user === num){
        client.send(message);

       }else{
           console.log(2)
       }
    }
  
});
}