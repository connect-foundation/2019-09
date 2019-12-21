const { io } = require('../../io');
const gameController = require('../controllers/gameController');
const roomController = require('../controllers/roomController');

const sendReadyHandler = (socket, { isReady }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const playerCount = gameManager.getPlayers().length;
  const player = gameManager.getPlayerBySocketId(socket.id);

  gameController.setPlayerReady(player, isReady);
  gameController.sendReadyPlayerToRoom(io, gameManager, player);

  if (
    gameController.checkAllPlayersAreReady(gameManager) &&
    gameController.isPlayerCountPlayable(playerCount)
  ) {
    gameController.prepareGame(gameManager, timer);
  }
};

module.exports = sendReadyHandler;
