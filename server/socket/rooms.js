const short = require('short-uuid');
const io = require('./io');

const { rooms } = io.sockets.adapter;

const joinRoom = (roomId, socket) => {
  const { players } = rooms[roomId];
  const player = {
    nickname: socket.nickname,
    isReady: false,
    type: 'viewer',
  };

  socket.roomId = roomId;
  socket.join(roomId);
  players[socket.id] = player;
};

const initializeRoom = (roomId, socket) => {
  const player = {
    nickname: socket.nickname,
    isReady: false,
    type: 'viewer',
  };
  socket.roomId = roomId;
  socket.join(roomId);
  rooms[roomId].players = { [socket.id]: player };
};

const isRoomAvailable = players => {
  return Object.keys(players).length < 4;
};

const getAvailableRoomIds = () => {
  const roomIds = Object.keys(rooms);
  if (!roomIds) {
    return [];
  }
  const availableRoomIds = roomIds.filter(roomId => {
    const { players } = rooms[roomId];
    return players ? isRoomAvailable(players) : false;
  });
  return availableRoomIds;
};

const getAvailableRoomId = () => {
  const availableRoomIds = getAvailableRoomIds();
  if (availableRoomIds) {
    return availableRoomIds[0];
  }
  return;
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
  return socketIds.reduce((accumulate, socketId) => {
    if (socketId !== targetSocketId) {
      return { ...accumulate, key: players[socketId] };
    }
    return accumulate;
  }, {});
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
  /**  @todo: move constants to config */
  if (socketIds.length < 2) {
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
  /**  @todo: move constants to config */
  const initialStatus = {
    currentRound: 1,
    currentSet: 1,
  };
  rooms[roomId] = { ...rooms[roomId], ...initialStatus };
};

module.exports = {
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
};
