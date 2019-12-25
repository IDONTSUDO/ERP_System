let redis = require("redis"),
redisClient = redis.createClient();


redisClient.on('ready',function() {
    console.log("Redis is ready");
});
redisClient.on('error',function() {
    console.log("Error in Redis");
});


// include redis 



exports.handleUserIsOnline = (user,ws) =>{
    // console.log(user)

    redisClient.get(user,function(err,reply) {
        console.log("redis exs:",reply)
        ws.send(JSON.stringify(reply))
       });
       
}


exports.handleJoin = (ws,user) =>{
    let WSid = ws.id
    let USERid = user._id
    console.log(USERid)
    redisClient.set(USERid,WSid,function(err,reply) {
        console.log(reply);
       });
}
exports.handleLeave = (ws,user) =>{
    let WSid = ws.id
    let USERid = user._id
    redisClient.del(USERid,WSid,function(err,reply) {
       console.log("redis:",reply)
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