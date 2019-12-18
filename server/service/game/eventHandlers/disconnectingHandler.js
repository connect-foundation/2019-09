const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const {
  PLAYING,
  INITIALIZING,
  INITIAL_PREPARING,
  WAITING,
} = require('../../../constants/gameStatus');
const {
  MIN_PLAYER_COUNT,
  SECONDS_AFTER_GAME_END,
} = require('../../../constants/gameRule');
const { SEND_LEFT_PLAYER } = require('../../../constants/event');

const disconnectingHandler = socket => {
  try {
    const room = roomController.getRoomByRoomId(socket.roomId);
    if (!room) {
      return;
    }
    const { gameManager, timer } = room;
    gameManager.leaveRoom(socket.id);
    socket.leave(gameManager.getRoomId());
    const roomStatus = gameManager.getStatus();

    io.in(gameManager.getRoomId()).emit(SEND_LEFT_PLAYER, {
      socketId: socket.id,
    });

    if (roomStatus === WAITING) {
      if (
        gameManager.checkAllPlayersAreReady() &&
        gameManager.getPlayers().length >= MIN_PLAYER_COUNT
      ) {
        gameController.prepareGame(gameManager, timer);
      }
      return;
    }

    if (
      roomStatus === INITIALIZING ||
      roomStatus === PLAYING ||
      roomStatus === INITIAL_PREPARING
    ) {
      if (!gameManager.isGameContinuable()) {
        gameController.endGame(gameManager, timer);
        gameController.resetGameAfterNSeconds({
          seconds: SECONDS_AFTER_GAME_END,
          gameManager,
          timer,
        });
        return;
      }
      if (!gameManager.getStreamer()) {
        gameController.repeatSet(gameManager, timer);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = disconnectingHandler;
