let Online = require("../database/Online");
const socket_IO = require("socket.io");

exports.newSocketSession = async (socket, session, id) => {
  Online.count({ io_socket: socket.id }, function(err, count) {
    console.log(count);
  });

  //  socket.broadcast.to(id).emit('my message', msg);
  Online.find({}).then(data => {
    let msg = "eqwqwe";
    socket.broadcast.to(data.io_id).emit("timer", msg);
    socket.broadcast.to(data.io_id).emit("subscribeToTimer", msg);
  });
  let onl = new Online();
  onl.session = session;
  onl.user = id;
  onl.io_id = socket.id;
  await onl.save();
};
exports.deleteSocketSession = async (socket, session, id) => {
  await Online.deleteOne({ io_id: socket.id });
};
exports.SocketBroadCastNewDialog = async message => {
  let { users, name, _id } = message.data;
  for (let user of users) {
    Online.find({ user: user }).then(data => {
      socket.broadcast.to(id).emit("my message", msg);
    });
  }
};
