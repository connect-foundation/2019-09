const rooms = require('../rooms');
const io = require('../io');

const assignViewer = socket => {
  const room = rooms.getRoomByRoomId(socket.roomId);
  const { streamerSocketId } = room;
  const socketIds = Object.keys(room.players);
  socketIds.forEach(socketId => {
    if (socketId !== streamerSocketId) {
      io.to(socketId).emit('assignViewer', { streamerSocketId });
    }
  });
};

const assignStreamer = socket => {
  const { streamerSocketId } = rooms.getRoomByRoomId(socket.roomId);
  io.to(streamerSocketId).emit('assignStreamer');
};

const startRound = roomId => {
  rooms.setRound(roomId);
  io.to(roomId).emit('roundStart', {
    currentRound: rooms.getRoomByRoomId(roomId).currentRound,
  });
};

const startSet = roomId => {
  rooms.setSet(roomId);
  io.to(roomId).emit('setStart', {
    currentSet: rooms.getRoomByRoomId(roomId).currentSet,
  });
};

const startGame = (socket, roomId) => {
  rooms.resetGameProgress(roomId);
  rooms.setRoomStatusByRoomId(roomId, 'playing');
  io.to(roomId).emit('gameStart');
  startRound(roomId);
  startSet(roomId);
  assignStreamer(socket);
  assignViewer(socket);
};

const setPlayerReady = (socket, isReady) => {
  const room = rooms.findRoomBySocket(socket);
  room.players[socket.id].isReady = isReady;
};

const emitReadyToRoom = (socket, isReady) => {
  io.in(socket.roomId).emit('sendReady', { socketId: socket.id, isReady });
};

const sendReadyHandler = (socket, { isReady }) => {
  if (rooms.getRoomStatusByRoomId(socket.roomId) === 'playing') {
    return;
  }

  setPlayerReady(socket, isReady);
  emitReadyToRoom(socket, isReady);
  if (rooms.isRoomReady(socket.roomId)) {
    startGame(socket, socket.roomId);
  }
};

module.exports = sendReadyHandler;
