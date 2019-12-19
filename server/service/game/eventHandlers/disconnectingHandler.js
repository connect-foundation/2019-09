const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const GAME_STATUS = require('../../../constants/gameStatus');
const { MIN_PLAYER_COUNT } = require('../../../constants/gameRule');
const { SEND_LEFT_PLAYER } = require('../../../constants/event');

const leavePlayer = (gameManager, socket) => {
  gameManager.leaveRoom(socket.id);
  socket.leave(gameManager.getRoomId());
};

const sendLeftPlayerToRoom = (roomId, socketId) => {
  io.in(roomId).emit(SEND_LEFT_PLAYER, {
    socketId,
  });
};

const disconnectingHandler = socket => {
  try {
    const room = roomController.getRoomByRoomId(socket.roomId);
    if (!room) {
      return;
    }
    const { gameManager, timer } = room;
    const roomStatus = gameManager.getStatus();
    leavePlayer(gameManager, socket);
    sendLeftPlayerToRoom(gameManager.getRoomId(), socket.id);

    switch (roomStatus) {
      case GAME_STATUS.WAITING:
        if (
          gameManager.checkAllPlayersAreReady() &&
          gameManager.getPlayers().length >= MIN_PLAYER_COUNT
        ) {
          gameController.prepareGame(gameManager, timer);
        }
        break;

      case GAME_STATUS.CONNECTING:
      case GAME_STATUS.INITIALIZING:
      case GAME_STATUS.PLAYING:
        if (!gameManager.isSetContinuable()) {
          gameController.repeatSet(gameManager, timer);
        }
        break;

      case GAME_STATUS.SCORE_SHARING:
        if (!gameManager.isNextSetAvailable()) {
          gameController.goToEnding(gameManager, timer);
        }
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = disconnectingHandler;
