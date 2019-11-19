module.exports = {
  distributePlayerTypes(io, streamerId, socketIds) {
    socketIds.forEach(socketId => {
      if (streamerId === socketId) {
        io.to(socketId).emit('playerType:streamer');
      } else {
        io.to(socketId).emit('playerType:viewer');
      }
    });
  },
};
