let redis = require("redis"),
redisClient = redis.createClient();


redisClient.on('ready',function() {
    console.log("Redis is ready");
});
redisClient.on('error',function() {
    console.log("Error in Redis");
});


// include redis 



exports.handleUserIsOnline = (UserId,SoketId) =>{
    
}


exports.handleJoin = (UserId,SoketId) =>{
    redisClient.set(UserId,SoketId,function(err,reply) {
        console.log("err",err)
        console.log("reply",reply)
       });
    redisClient.get(UserId,function(err,reply) {
        console.log(err);
        console.log("its key",reply);
    });
 
    console.log("clent join",UserId,SoketId)
    // socket.join (`${UserId}`);
}
exports.handleLeave = (UserId,SoketId) =>{
    console.log("client leave",UserId,SoketId)


    redisClient.del(UserId,function(err,reply) {
        if(!err) {
         if(reply === 1) {
          console.log("Key is deleted");
         } else {
          console.log("Does't exists");
         }
        }
       });
       redisClient.get(UserId,function(err,reply) {
        console.log(err);
        console.log("its key",reply);
       });
}
exports.handleMessage = () =>{
    console.log("messages")
}
exports.handleGetChatrooms = () =>{
    console.log("get chat rooms")
}
exports.handleGetAvailableUsers = () =>{
    console.log("get  users")

}
exports.handleRegister = () =>{
    console.log("client register")

}
exports.handleDisconnect = () =>{
    console.log("client disconect")
}