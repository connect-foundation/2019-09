const rooms = require('./rooms');
const io = require('./io');
const { MIN_USER_COUNT } = require('../config');

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

const startRound = socket => {
  const { roomId } = socket;
  rooms.setRound(roomId);
  io.to(roomId).emit('roundStart', {
    currentRound: rooms.getRoomByRoomId(roomId).currentRound,
  });
};

const startSet = socket => {
  const { roomId } = socket;
  rooms.setSet(roomId);
  io.to(roomId).emit('setStart', {
    currentSet: rooms.getRoomByRoomId(roomId).currentSet,
  });
  assignStreamer(socket);
  assignViewer(socket);
};

const endSet = roomId => {
  const room = rooms.getRoomByRoomId(roomId);
  const { streamerSocketId } = room;
  room.players[streamerSocketId].type = 'viewer';
  io.to(roomId).emit('setEnd', { currentSet: room.currentSet });
};

const startGame = socket => {
  const { roomId } = socket;
  rooms.resetGameProgress(roomId);
  rooms.setRoomStatusByRoomId(roomId, 'playing');
  io.to(roomId).emit('gameStart');
  startRound(socket);
  startSet(socket);
};

const isGameContinuable = socket => {
  const room = rooms.getRoomByRoomId(socket.roomId);
  try {
    return Object.keys(room.players).length > MIN_USER_COUNT;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  assignStreamer,
  assignViewer,
  startSet,
  startRound,
  startGame,
  endSet,
  isGameContinuable,
};
