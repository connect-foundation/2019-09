const rooms = require('../rooms');

const getRoomByRoomId = roomId => {
  const room = rooms[roomId];
  return room;
};

module.exports = getRoomByRoomId;
