const short = require('short-uuid');
const { rooms } = require('../io');
const { MAX_PLAYER_COUNT } = require('../../config');
const GameManager = require('./GameManager');

const getRoomByRoomId = roomId => {
  const room = rooms[roomId];
  return room;
};

/**
 * player가 room에 join하기 위한 함수
 * 새로운 room일 경우 GameManager생성 및 room.gameManager에 할당
 * @param {object} param0
 */
const joinRoom = ({ socket, roomId, player }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  const room = getRoomByRoomId(roomId);

  if (!room.gameManager) {
    room.gameManager = new GameManager(roomId);
  }
  room.gameManager.addPlayer(player);
};

const generateRoomId = () => {
  let roomId = short.uuid();
  while (rooms[roomId]) {
    roomId = short.uuid();
  }
  return roomId;
};

const isRoomJoinable = gameManager => {
  if (!gameManager) return false;

  const players = gameManager.getPlayers();
  if (players.length === 0) return false;

  const isRoomFull = players.length >= MAX_PLAYER_COUNT;
  const isRoomWaiting = gameManager.getStatus() === 'waiting';
  return !isRoomFull && isRoomWaiting;
};

/**
 * join할 방의 정보를 반환해주는 함수
 * @return {object} { roomId, isExistingRoom }
 */
const getRoomInformantionToJoin = () => {
  const roomInformation = {
    isExistingRoom: false,
    roomId: '',
  };
  const roomIds = Object.keys(rooms);
  /**
   * starvation 방지 로직 필요!
   */
  const joinableRoomId = roomIds.find(roomId => {
    const room = getRoomByRoomId(roomId);
    return isRoomJoinable(room.gameManager);
  });

  roomInformation.isExistingRoom = !!joinableRoomId;
  roomInformation.roomId = joinableRoomId || generateRoomId();
  return roomInformation;
};

module.exports = {
  joinRoom,
  generateRoomId,
  getRoomByRoomId,
  getRoomInformantionToJoin,
};
