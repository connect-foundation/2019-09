const rooms = require('../rooms');
const io = require('../io');

const startGame = (socket, roomId) => {
  rooms.resetGameProgress(roomId);
  io.to(roomId).emit('gameStart');
  rooms.setRound(roomId);
  io.to(roomId).emit('roundStart', {
    currentRound: rooms.getRoomByRoomId(roomId).currentRound,
  });
  rooms.setSet(roomId);
  io.to(roomId).emit('setStart', {
    currentSet: rooms.getRoomByRoomId(roomId).currentSet,
  });
};

const setPlayerReady = (socket, isReady) => {
  const room = rooms.findRoomBySocket(socket);
  room.players[socket.id].isReady = isReady;
};

const emitReadyToRoom = (socket, isReady) => {
  io.in(socket.roomId).emit('sendReady', { socketId: socket.id, isReady });
};

const sendReadyHandler = (socket, { isReady }) => {
  setPlayerReady(socket, isReady);
  emitReadyToRoom(socket, isReady);
  if (rooms.isRoomReady(socket.roomId)) {
    startGame(socket, socket.roomId);
  }
};

module.exports = sendReadyHandler;
