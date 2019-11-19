module.exports = {

  distributePlayerTypes(io, streamerIndex, socketIds) {
    socketIds.forEach((socketId, i) => {
      if (i === streamerIndex) {
        io.to(socketId).emit('playerType:streamer');
      } else {
        io.to(socketId).emit('playerType:viewer');
      }
    });
  }

}