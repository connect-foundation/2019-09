const { SEND_SOCKET_ID } = require('../../../constants/event');

const askSocketIdHandler = socket => {
  socket.emit(SEND_SOCKET_ID, { socketId: socket.id });
};

module.exports = askSocketIdHandler;
