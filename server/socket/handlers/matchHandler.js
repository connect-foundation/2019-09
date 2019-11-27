const rooms = require('../rooms');

const matchHandler = (socket, { nickname }) => {
  socket.nickname = nickname;
  const socketId = socket.id;
  const availableRoomId = rooms.getAvailableRoomId();

  if (availableRoomId) {
    rooms.joinRoom(availableRoomId, socket);
    socket.emit('sendRoomId', { roomId: availableRoomId });
    socket.broadcast
      .to(availableRoomId)
      .emit('sendNewPlayer', { [socketId]: { nickname } });
    const players = rooms.getOtherPlayers(availableRoomId, socketId);
    socket.emit('sendPlayers', { players });
    return;
  }

  const roomId = rooms.createRoomId();
  rooms.initializeRoom(roomId, socket);
  socket.emit('sendRoomId', { roomId });
};

module.exports = matchHandler;
