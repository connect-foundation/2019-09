const short = require('short-uuid');
const io = require('./io');

const { rooms } = io.sockets.adapter;

const joinRoom = ({ roomId, socket, nickname }) => {
  const socketId = socket.id;
  socket.join(roomId);
  rooms[roomId][socketId].nickname = nickname;
};

const isRoomAvailable = room => {
  return Object.keys(room).length < 4;
};

const getAvailableRoomIds = () => {
  const roomIds = Object.keys(rooms);
  const availableRoomIds = roomIds.filter(roomId => {
    return isRoomAvailable(rooms[roomId]);
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
  const room = rooms[roomId];
  const socketIds = Object.keys(room);
  return socketIds;
};

const getSockets = roomId => {
  const room = rooms[roomId];
  const sockets = room;
  return sockets;
};

const getOtherSockets = (roomId, targetSocketId) => {
  const sockets = getSockets(roomId);

  const keys = Object.keys(sockets);

  return keys.reduce((accumulate, key) => {
    if (key !== targetSocketId) {
      return [...accumulate, sockets[key]];
    }
    return accumulate;
  }, []);
};

const getOtherSocketIds = (roomId, targetSocketId) => {
  const socketIds = getSocketIds(roomId);
  const otherSocketIds = socketIds.filter(
    socketId => targetSocketId !== socketId,
  );
  return otherSocketIds;
};

module.exports = {
  joinRoom,
  getAvailableRoomId,
  createRoomId,
  getSocketIds,
  getOtherSocketIds,
  getOtherSockets,
};
