let redis = require("redis"),
redisClient = redis.createClient();


redisClient.on('ready',function() {
    console.log("Redis is ready");
});
redisClient.on('error',function() {
    console.log("Error in Redis");
});



exports.handelUserSecurity = (req) =>{
    let user = req.worker
    let data = `${user}SECURITY`
    console.log(typeof user)
    console.log(typeof data)
    redisClient.set(data,function(err,reply) {
        console.log("redis exs:",err)
        console.log("redis set key:",reply)
       });
       
}
