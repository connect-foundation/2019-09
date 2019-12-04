const { io } = require('../../io');
const roomController = require('../roomController');

const connectPeerHandler = socket => {
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);
  player.setIsConnectedToStreamer(true);

  if (gameManager.checkAllConnectionsToStreamer()) {
    gameManager.clearPeerConnectCheckTimer();
    io.in(gameManager.roomId).emit('startGame');
  }
};

module.exports = connectPeerHandler;
