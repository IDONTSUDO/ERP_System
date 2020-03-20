let Online = require("../database/Online");

exports.newSocketSession = async (socket, session, id) => {

  let onl = new Online();
  onl.session = session;
  onl.user = id;
  onl.io_id = socket.id;
  await onl.save();
};
exports.deleteSocketSession = async (socket, session, id) => {
  await Online.deleteOne({ io_id: socket.id });
};
