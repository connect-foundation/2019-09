const askSocketIdHandler = socket => {
  socket.emit('sendSocketId', { socketId: socket.id });
};

module.exports = askSocketIdHandler;
