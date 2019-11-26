const io = require('../init');
const rooms = require('../rooms');

const matchHandler = (socket, { nickname }) => {
  const socketId = socket.id;
  const availableRoomId = rooms.getAvailableRoomId();
  socket.nickname = nickname;

  if (availableRoomId) {
    rooms.joinRoom(availableRoomId, socket);
    socket.emit('sendRoomId', { roomId: availableRoomId });
    socket.broadcast
      .to(availableRoomId)
      .emit('sendNewPlayer', { socketId: socket.id, nickname: nickname });

    socket.emit('sendPlayers', {
      players: rooms.getOtherSockets(availableRoomId, socketId),
    });
    return;
  }

  const roomId = rooms.createRoomId();
  rooms.joinRoom(roomId, socket);
  socket.emit('sendRoomId', { roomId: roomId });
};
