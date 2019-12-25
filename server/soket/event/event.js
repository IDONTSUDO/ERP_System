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


exports.handleJoin = (io,soket,decod) =>{
    // soket id and decoded id set redis 
    redisClient.set(decod._id,soket.id)
    console.log("join",soket.id,decod._id)
}
exports.handleLeave = (decod) =>{
    console.log("leave",decod._id)
    redisClient.del(decod._id,function(err,reply) {
        if(!err) {
         if(reply === 1) {
          console.log("Key is deleted");
         } else {
          console.log("Does't exists");
         }
        }
       })
}
exports.UserisOnline = () =>{
    
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