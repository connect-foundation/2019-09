const { getRoomByRoomId } = require('../room');

const getPlayerBySocket = socket => {
  const room = getRoomByRoomId(socket.roomId);
  return room.players[socket.id];
};

module.exports = getPlayerBySocket;
