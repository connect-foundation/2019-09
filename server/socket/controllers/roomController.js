const short = require('short-uuid');
const io = require('../io');
const { INITIAL_ROOM_STATUS, MAX_USER_COUNT } = require('../../config');

const { rooms } = io.sockets.adapter;

const setRoom = (roomId, obj) => {
  const keys = Object.keys(obj);
  keys.forEach(key => {
    rooms[roomId][key] = obj.key;
  });
};

const removePlayerFromRoom = (player, room) => {
  delete room.players[player.socketId];

  if (room.streamerCandidates) {
    room.streamerCandidates.map(round => {
      round = round.filter(set => set.socketId !== player.socketId);
      return round;
    });
  }
  if (room.streamer && room.streamer.socketId === player.socketId) {
    room.streamer = {};
  }
};

const joinRoom = ({ socket, roomId, player }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  rooms[roomId].players[player.socketId] = player;
};

const setInitialStatusOfRoom = room => {
  const keys = Object.keys(INITIAL_ROOM_STATUS);
  keys.forEach(key => {
    room[key] = INITIAL_ROOM_STATUS[key];
  });
};

/**
 *
 * @param {*} param0
 */
const initializeRoom = ({ socket, roomId, player }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  setInitialStatusOfRoom(rooms[roomId]);
  rooms[roomId].players = { [socket.id]: player };
};

const getRoomByRoomId = roomId => {
  const room = rooms[roomId];
  return room;
};

const isRoomJoinable = room => {
  const { players } = room;
  if (!players) {
    return false;
  }
  const isRoomFull = Object.keys(players).length >= MAX_USER_COUNT;
  const isRoomPlaying = room.status === 'playing';
  return !isRoomFull && !isRoomPlaying;
};

const getJoinableRoomId = () => {
  const roomIds = Object.keys(rooms);
  if (!roomIds) {
    return [];
  }
  const joinableRoomId = roomIds.find(roomId => {
    const room = rooms[roomId];
    return isRoomJoinable(room);
  });

  return joinableRoomId;
};

const generateRoomId = () => {
  let roomId = short.uuid();
  while (rooms[roomId]) {
    roomId = short.uuid();
  }
  return roomId;
};

module.exports = {
  generateRoomId,
  getJoinableRoomId,
  initializeRoom,
  joinRoom,
  getRoomByRoomId,
  setRoom,
  removePlayerFromRoom,
};
