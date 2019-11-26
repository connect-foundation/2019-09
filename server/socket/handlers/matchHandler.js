const rooms = require('../rooms');

const matchHandler = (socket, { nickname }) => {
  const socketId = socket.id;
  const availableRoomId = rooms.getAvailableRoomId();

  if (availableRoomId) {
    rooms.joinRoom({ roomId: availableRoomId, socket, nickname });
    socket.emit('sendRoomId', { roomId: availableRoomId });
    socket.broadcast
      .to(availableRoomId)
      .emit('sendNewPlayer', { [socketId]: { nickname } });

    socket.emit('sendPlayers', {
      players: rooms.getOtherSockets(availableRoomId, socketId),
    });
    return;
  }

  const roomId = rooms.createRoomId();
  rooms.joinRoom(roomId, socket);
  socket.emit('sendRoomId', { roomId });
};

module.exports = matchHandler;