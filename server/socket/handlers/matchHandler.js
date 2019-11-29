const rooms = require('../rooms');

const emitEventsAfterJoin = (socket, roomId) => {
  socket.emit('sendRoomId', { roomId });
  socket.emit('startChatting');
};

const matchHandler = (socket, { nickname }) => {
  socket.nickname = nickname;
  const socketId = socket.id;
  const availableRoomId = rooms.getAvailableRoomId();

  if (availableRoomId) {
    rooms.joinRoom(availableRoomId, socket);
    emitEventsAfterJoin(socket, availableRoomId);
    const newPlayer = rooms.getPlayersByRoomId(availableRoomId)[socketId];
    socket.broadcast.to(availableRoomId).emit('sendNewPlayer', {
      socketId,
      ...newPlayer,
    });
    const otherPlayers = rooms.getOtherPlayers(availableRoomId, socketId);
    socket.emit('sendPlayers', { players: otherPlayers });
    return;
  }

  const roomId = rooms.createRoomId();
  rooms.initializeRoom(roomId, socket);
  emitEventsAfterJoin(socket, roomId);
};

module.exports = matchHandler;
