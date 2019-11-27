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
    socket.broadcast
      .to(availableRoomId)
      .emit('sendNewPlayer', { [socketId]: { nickname } });
    const players = rooms.getOtherPlayers(availableRoomId, socketId);
    socket.emit('sendPlayers', { players });
    return;
  }

  const roomId = rooms.createRoomId();
  rooms.initializeRoom(roomId, socket);
  emitEventsAfterJoin(socket, roomId);
};

module.exports = matchHandler;
