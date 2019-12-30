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



exports.HandelUsers = (ws) =>{
}
exports.UserIsLeave = (ws) =>{

}