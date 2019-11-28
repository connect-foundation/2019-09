const rooms = require('../rooms');
const io = require('../io');
const { startGame } = require('../gameController');

const setPlayerReady = (socket, isReady) => {
  const room = rooms.findRoomBySocket(socket);
  room.players[socket.id].isReady = isReady;
};

const emitReadyToRoom = (socket, isReady) => {
  io.in(socket.roomId).emit('sendReady', { socketId: socket.id, isReady });
};

const sendReadyHandler = (socket, { isReady }) => {
  const status = rooms.getRoomStatusByRoomId(socket.roomId);
  if (status === 'playing') {
    return;
  }
  setPlayerReady(socket, isReady);
  emitReadyToRoom(socket, isReady);
  if (rooms.isRoomReady(socket.roomId)) {
    startGame(socket, socket.roomId);
  }
};

module.exports = sendReadyHandler;
