const rooms = require('../rooms');

const joinRoom = ({ socket, roomId, player }) => {
  socket.join(roomId);
  socket.roomId = roomId;
  rooms[roomId].players[player.socketId] = player;
};

module.exports = joinRoom;
