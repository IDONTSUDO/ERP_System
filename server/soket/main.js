var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


let users = {};

let lastUser = 0;

io.on('connection', function(socket){
    console.log('a user connected');

    let id = ++lastUser;

    users[id] = socket;
  
    io.to(socket.id).emit('my id', id);
    io.to(socket.id).emit("online users", Object.keys(users));

    socket.broadcast.emit("user connected", { id: id});

    socket.on('chat message', function(msg){

        console.log(msg);

        console.log(users[msg.id]);

        if(users[msg.id] !== undefined){
            io.to(users[msg.id].id).emit('private message', msg.text);
        }else {
            io.emit('chat message', msg.text);

        }
    });


    socket.on('disconnect', function(){
        console.log('user disconnected');

        io.emit('user disconnected', id);

        delete users[id];
    });
});

http.listen(4041, function(){
    console.log('listening on *:3000');
});