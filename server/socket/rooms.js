const short = require('short-uuid');
const io = require('./io');
const {
  INITIAL_PLAYER_STATUS,
  MIN_USER_COUNT,
  INITIAL_GAME_STATUS,
  MAX_USER_COUNT,
} = require('../config');
const colorGenerator = require('../utils/colorGenerator');

const { rooms } = io.sockets.adapter;

const setRoomStatusByRoomId = (roomId, status) => {
  const room = rooms[roomId];
  room.status = status;
};

const getRoomStatusByRoomId = roomId => {
  try {
    const room = rooms[roomId];
    return room.status;
  } catch (error) {
    return 'error';
  }
};

const joinRoom = (roomId, socket) => {
  const { players } = rooms[roomId];
  const initialPlayerStatus = { ...INITIAL_PLAYER_STATUS };
  initialPlayerStatus.nickname = socket.nickname;
  socket.roomId = roomId;
  socket.nicknameColor = colorGenerator.getRandomColor();
  socket.join(roomId);
  players[socket.id] = initialPlayerStatus;
};

const initializeRoom = (roomId, socket) => {
  const initialPlayerStatus = { ...INITIAL_PLAYER_STATUS };
  initialPlayerStatus.nickname = socket.nickname;
  socket.roomId = roomId;
  socket.nicknameColor = colorGenerator.getRandomColor();
  socket.join(roomId);
  rooms[roomId].players = { [socket.id]: initialPlayerStatus };
  setRoomStatusByRoomId(roomId, 'waiting');
};

const isRoomAvailable = room => {
  const { players } = room;
  const isRoomFull = Object.keys(players).length >= MAX_USER_COUNT;
  const isRoomPlaying = room.status === 'playing';
  return !isRoomFull && !isRoomPlaying;
};

const getAvailableRoomIds = () => {
  const roomIds = Object.keys(rooms);
  if (!roomIds) {
    return [];
  }
  const availableRoomIds = roomIds.filter(roomId => {
    const room = rooms[roomId];
    return room.players ? isRoomAvailable(room) : false;
  });
  return availableRoomIds;
};

const getAvailableRoomId = () => {
  const availableRoomIds = getAvailableRoomIds();
  if (availableRoomIds) {
    return availableRoomIds[0];
  }
  return undefined;
};

const createRoomId = () => {
  let roomId = short.uuid();
  while (rooms[roomId]) {
    roomId = short.uuid();
  }
  return roomId;
};

const getSocketIds = roomId => {
  const { sockets } = rooms[roomId];
  const socketIds = Object.keys(sockets);
  return socketIds;
};

const getPlayersByRoomId = roomId => {
  const { players } = rooms[roomId];
  return players;
};

const getOtherPlayers = (roomId, targetSocketId) => {
  const players = getPlayersByRoomId(roomId);
  const socketIds = Object.keys(players);
  const otherPlayers = socketIds.reduce((accumulate, socketId) => {
    if (socketId !== targetSocketId) {
      return { ...accumulate, [socketId]: players[socketId] };
    }
    return accumulate;
  }, {});
  return otherPlayers;
};

const getOtherSocketIds = (roomId, targetSocketId) => {
  const socketIds = getSocketIds(roomId);
  const otherSocketIds = socketIds.filter(
    socketId => targetSocketId !== socketId,
  );
  return otherSocketIds;
};

const findRoomBySocket = socket => {
  return rooms[socket.roomId];
};

const isRoomReady = roomId => {
  const { players } = rooms[roomId];
  const socketIds = Object.keys(players);
  if (socketIds.length < MIN_USER_COUNT) {
    return false;
  }
  return socketIds.every(socketId => {
    return players[socketId].isReady;
  });
};

const getRoomByRoomId = roomId => {
  return rooms[roomId];
};

const resetGameProgress = roomId => {
  Object.keys(INITIAL_GAME_STATUS).forEach(key => {
    rooms[roomId][key] = INITIAL_GAME_STATUS[key];
  });
};

const setRound = roomId => {
  const room = rooms[roomId];

  room.currentRound++;
  const { players } = room;
  room.streamers = { ...players };
};

const setSet = roomId => {
  const room = rooms[roomId];

  room.currentSet++;
  const { streamers } = room;
  const targetSocketId = Object.keys(streamers)[0];

  if (!targetSocketId) return;
  room.players[targetSocketId].type = 'streamer';
  room.streamerSocketId = targetSocketId;
  delete streamers[targetSocketId];
};

const removePlayerBySocket = socket => {
  try {
    delete rooms[socket.roomId].players[socket.id];
  } catch (e) {
    console.error('ERROR:\tremovePlayerBySocket\n', e);
  }
};

const isSocketStreamerCandidate = socket => {
  try {
    return rooms[socket.roomId].streamers[socket.id];
  } catch (error) {
    return false;
  }
};

const removeStreamerBySocket = socket => {
  try {
    const room = rooms[socket.roomId];
    delete room.streamers[socket.id];
  } catch (e) {
    console.log();
  }
};

module.exports = {
  getPlayersByRoomId,
  joinRoom,
  getAvailableRoomId,
  createRoomId,
  getSocketIds,
  getOtherSocketIds,
  getOtherPlayers,
  findRoomBySocket,
  isRoomReady,
  getRoomByRoomId,
  resetGameProgress,
  initializeRoom,
  setRound,
  setSet,
  removePlayerBySocket,
  setRoomStatusByRoomId,
  getRoomStatusByRoomId,
  isSocketStreamerCandidate,
  removeStreamerBySocket,
};
