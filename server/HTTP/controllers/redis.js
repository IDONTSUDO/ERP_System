let redis = require("redis"),
redisClient = redis.createClient();


redisClient.on('ready',function() {
    console.log("Redis is ready");
});
redisClient.on('error',function() {
    console.log("Error in Redis");
});

exports.NewSession = async (req) =>{
//    let session =  req.session
//    let UserId = req.
//    console.log(session)
  
//    redisClient.set(session,session,redis.print)
    return
}