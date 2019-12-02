const rooms = require('../rooms');
const { MAX_USER_COUNT } = require('../../config');

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

module.exports = getJoinableRoomId;
