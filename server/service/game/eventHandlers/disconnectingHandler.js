const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const GAME_STATUS = require('../../../constants/gameStatus');

const disconnectingHandler = socket => {
  try {
    const room = roomController.getRoomByRoomId(socket.roomId);
    if (!room) return;

    const { gameManager, timer } = room;
    const playerCount = gameManager.getPlayers();
    const roomId = gameManager.getRoomId();

    gameController.makePlayerLeave(gameManager, socket);
    gameController.sendLeftPlayerToRoom(io, roomId, socket.id);

    switch (gameController.getRoomStatus(gameManager)) {
      case GAME_STATUS.WAITING:
        if (
          gameController.checkAllPlayersAreReady(gameManager) &&
          gameController.isPlayerCountPlayable(playerCount)
        ) {
          gameController.prepareGame(gameManager, timer);
        }
        break;

      case GAME_STATUS.CONNECTING:
      case GAME_STATUS.INITIALIZING:
      case GAME_STATUS.PLAYING:
        if (!gameController.isSetContinuable(gameManager)) {
          gameController.repeatSet(gameManager, timer);
        }
        break;

      case GAME_STATUS.SCORE_SHARING:
        if (!gameController.isNextSetAvailable(gameManager)) {
          gameController.goToEnding(gameManager, timer);
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = disconnectingHandler;
