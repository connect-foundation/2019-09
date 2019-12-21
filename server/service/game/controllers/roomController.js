const short = require('short-uuid');
const { rooms } = require('../../io');
const { MAX_PLAYER_COUNT } = require('../../../constants/gameRule');
const { WAITING } = require('../../../constants/gameStatus');
const GameManager = require('../models/GameManager');
const Timer = require('../models/Timer');

const getRoomByRoomId = roomId => {
  const room = rooms[roomId];
  return room;
};

/**
 * player가 room에 join하기 위한 함수
 * 새로운 room일 경우 GameManager생성 및 room.gameManager에 할당
 * @param {object} param0
 */
const joinRoom = ({ socket, roomId, player, isRoomPrivate }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  const room = getRoomByRoomId(roomId);

  if (!room.gameManager) {
    room.gameManager = new GameManager(roomId);
    room.timer = new Timer(roomId);
  }
  room.gameManager.addPlayer(player);
  room.gameManager.setIsRoomPrivate(isRoomPrivate);
};

const generateRoomId = () => {
  let roomId = short.uuid();
  while (rooms[roomId]) {
    roomId = short.uuid();
  }
  return roomId;
};

const isRoomJoinable = (gameManager, urlRoomId) => {
  if (!gameManager) return false;

  const players = gameManager.getPlayers();
  if (players.length === 0) return false;

  let isRoomAccessible = true;
  if (gameManager.getIsRoomPrivate()) {
    isRoomAccessible = gameManager.getRoomId() === urlRoomId;
  }

  const isRoomFull = players.length >= MAX_PLAYER_COUNT;
  const isRoomWaiting = gameManager.getStatus() === WAITING;
  return !isRoomFull && isRoomWaiting && isRoomAccessible;
};

/**
 * join할 공개방의 정보를 반환해주는 함수
 * @return {string} roomId
 */
const getPublicRoomIdToJoin = () => {
  const roomIds = Object.keys(rooms);
  const joinableRoomId = roomIds.find(roomId => {
    const room = getRoomByRoomId(roomId);
    return isRoomJoinable(room.gameManager);
  });
  return joinableRoomId || generateRoomId();
};

/**
 * join할 비공개방의 id를 생성하여 반환해주는 함수
 * @return {string} roomId
 */
const getPrivateRoomIdToCreate = () => {
  return generateRoomId();
};

/**
 * join할 비공개방의 id를 반환해주는 함수
 * @return {string} roomId
 */
const getPrivateRoomIdToJoin = roomIdFromUrl => {
  const room = getRoomByRoomId(roomIdFromUrl);
  if (room) {
    if (isRoomJoinable(room.gameManager, roomIdFromUrl)) {
      return roomIdFromUrl;
    }
  }
  return null;
};

module.exports = {
  joinRoom,
  generateRoomId,
  getRoomByRoomId,
  getPublicRoomIdToJoin,
  getPrivateRoomIdToJoin,
  getPrivateRoomIdToCreate,
};
