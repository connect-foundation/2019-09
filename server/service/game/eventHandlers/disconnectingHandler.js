const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const {
  SECONDS_AFTER_GAME_END,
  SECONDS_BETWEEN_SETS,
  MIN_PLAYER_COUNT,
} = require('../../../config');

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

    io.in(gameManager.getRoomId()).emit('sendLeftPlayer', {
      socketId: socket.id,
    });

    if (roomStatus === 'waiting') {
      if (
        gameManager.checkAllPlayersAreReady() &&
        gameManager.getPlayers().length >= MIN_PLAYER_COUNT
      ) {
        gameController.prepareGame(gameManager, timer);
      }
      return;
    }

    if (roomStatus === 'initializing' || roomStatus === 'playing') {
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
        gameController.endSet(gameManager, timer);
        gameManager.updateRoundAndSet();
        gameController.goToNextSetAfterNSeconds({
          seconds: SECONDS_BETWEEN_SETS,
          gameManager,
          timer,
        });
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = disconnectingHandler;
