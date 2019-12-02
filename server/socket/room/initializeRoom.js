const rooms = require('../rooms');
const { INITIAL_ROOM_STATUS } = require('../../config');

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

module.exports = initializeRoom;
