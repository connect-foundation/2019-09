const { io } = require('../../io');

const gameController = require('../controllers/gameController');
const roomController = require('../controllers/roomController');
const { MIN_PLAYER_COUNT } = require('../../../constants/gameRule');
const { SEND_READY } = require('../../../constants/event');

const sendReadyHandler = (socket, { isReady }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const playerCount = gameManager.getPlayers().length;
  const player = gameManager.getPlayerBySocketId(socket.id);
  player.setIsReady(isReady);

  io.in(gameManager.getRoomId()).emit(SEND_READY, {
    socketId: player.getSocketId(),
    isReady: player.getIsReady(),
  });

  if (
    gameManager.checkAllPlayersAreReady() &&
    playerCount >= MIN_PLAYER_COUNT
  ) {
    gameController.prepareGame(gameManager, timer);
  }
};

module.exports = sendReadyHandler;
