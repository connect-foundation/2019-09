// const io = require('../io');
// const playerController = require('../controllers/playerController');
// const roomController = require('../controllers/roomController');
// const { MIN_USER_COUNT } = require('../../config');

// const isGameContinueable = room => {
//   const socketIds = Object.keys(room.players);
//   if (socketIds.length < MIN_USER_COUNT) {
//     return false;
//   }
//   return true;
// };

// const disconnectingHandler = socket => {
//   const room = roomController.getRoomByRoomId(socket.roomId);
//   const { roomId } = socket;
//   const player = playerController.getPlayerBySocket(socket);
//   roomController.removePlayerFromRoom(player, room);
//   socket.leave(roomId);

//   io.to(roomId).emit('sendLeftPlayer', { socketId: socket.id });

//   io.to(roomId).emit('endGame');
// };

// module.exports = disconnectingHandler;
