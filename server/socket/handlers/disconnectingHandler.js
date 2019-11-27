const rooms = require('../rooms');

const disconnectingHandler = socket => {
  rooms.removePlayerBySocket(socket);
  socket.leave(socket.roomId);
};

module.exports = disconnectingHandler;
