const rooms = require('../rooms');
const { endSet, startSet, isGameContinuable } = require('../gameController');

const disconnectingHandler = socket => {
  const room = rooms.getRoomByRoomId(socket.roomId);
  socket.to(socket.roomId).emit('sendLeftPlayer', { socketId: socket.id });
  rooms.removePlayerBySocket(socket);
  if (rooms.isSocketStreamerCandidate(socket)) {
    rooms.removeStreamerBySocket(socket);
  }
  if (!isGameContinuable(socket)) {
    rooms.resetRoomPlayersBySocket(socket);
    rooms.setRoomStatusByRoomId(socket.roomId, 'waiting');
    socket.to(socket.roomId).emit('endGame');
  } else if (socket.id === room.streamerSocketId) {
    endSet(socket.roomId);
    startSet(socket.roomId);
  }
  socket.leave(socket.roomId);
};

module.exports = disconnectingHandler;
