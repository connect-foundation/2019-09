const short = require('short-uuid');
const { rooms } = require('./io');
const { MAX_PLAYER_COUNT } = require('../config');
const GameManager = require('./GameManager');

const getRoomByRoomId = roomId => {
  const room = rooms[roomId];
  return room;
};

const joinRoom = ({ socket, roomId, player }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  const room = getRoomByRoomId(roomId);

  room.gameManager.addPlayer(player);
};

const createRoom = ({ socket, roomId, player }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  const room = getRoomByRoomId(roomId);

  room.gameManager = new GameManager();
  room.gameManager.addPlayer(player);
};

const isRoomJoinable = gameManager => {
  if (!gameManager) return false;

  const players = gameManager.getPlayers();
  if (players.length === 0) return false;

  const isRoomFull = players.length >= MAX_PLAYER_COUNT;
  const isRoomPlaying = gameManager.getStatus() === 'playing';
  return !isRoomFull && !isRoomPlaying;
};

const getJoinableRoomId = () => {
  const roomIds = Object.keys(rooms);
  /**
   * starvation 방지 로직 필요!
   */
  const joinableRoomId = roomIds.find(roomId => {
    const room = getRoomByRoomId(roomId);
    return isRoomJoinable(room.gameManager);
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
  joinRoom,
  createRoom,
  generateRoomId,
  getRoomByRoomId,
  getJoinableRoomId,
};
