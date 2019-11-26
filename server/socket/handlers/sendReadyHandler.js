const rooms = require('../rooms');
const io = require('../io');

const startGame = roomId => {
  rooms.resetGameProgress(roomId);
  io.in(roomId).emit('gameStart');
  io.in(roomId).emit('roundStart');
  io.in(roomId).emit('setStart');
};

const setPlayerReady = (socket, isReady) => {
  const room = rooms.findRoomBySocket(socket);
  room[socket.id].isReady = isReady;
};

const emitReadyToRoom = (socket, isReady) => {
  io.in(socket.roomId).emit('sendReady', { socketId: socket.id, isReady });
};

const sendReadyHandler = (socket, { isReady }) => {
  setPlayerReady(socket, isReady);
  emitReadyToRoom(socket, isReady);
  if (rooms.isRoomReady(socket.roomId)) {
    startGame(socket.roomId);
  }
};

module.exports = sendReadyHandler;
