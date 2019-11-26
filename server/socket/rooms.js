const short = require('short-uuid');
const io = require('./io');

const { rooms } = io.sockets.adapter;

const joinRoom = ({ roomId, socket, nickname }) => {
  const socketId = socket.id;
  socket.roomId = roomId;
  socket.join(roomId);
  /** @todo rooms[roomId]에 socketData와 같이 사용자
   * 로직만 담당하는 객체 추가 필요.
   * 이후의 다른 코드에서도 이를 따라 수정해야 함
   */
  rooms[roomId][socketId].nickname = nickname;
};

const isRoomAvailable = room => {
  return Object.keys(room).length < 4;
};

const getAvailableRoomIds = () => {
  const roomIds = Object.keys(rooms);
  const availableRoomIds = roomIds.filter(roomId => {
    return isRoomAvailable(rooms[roomId].sockets);
  });
  return availableRoomIds;
};

const getAvailableRoomId = () => {
  return getAvailableRoomIds()[0];
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

const getSockets = roomId => {
  const { sockets } = rooms[roomId];
  return sockets;
};

const getOtherSockets = (roomId, targetSocketId) => {
  const sockets = getSockets(roomId);

  const keys = Object.keys(sockets);

  return keys.reduce((accumulate, key) => {
    if (key !== targetSocketId) {
      return { ...accumulate, key: sockets[key] };
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
  const { sockets } = rooms[roomId];
  const socketIds = Object.keys(sockets);
  /**  @todo: move constants to config */
  if (socketIds.length < 2) {
    return false;
  }
  return socketIds.every(socketId => {
    return sockets[socketId].isReady;
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
  getOtherSockets,
  findRoomBySocket,
  isRoomReady,
  getRoomByRoomId,
  resetGameProgress,
};
