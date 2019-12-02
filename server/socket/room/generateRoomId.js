const short = require('short-uuid');
const rooms = require('../../config');

const generateRoomId = () => {
  let roomId = short.uuid();
  while (rooms[roomId]) {
    roomId = short.uuid();
  }
  return roomId;
};

module.exports = generateRoomId;
