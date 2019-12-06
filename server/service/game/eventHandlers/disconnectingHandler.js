const { io } = require('../../io');
const roomController = require('../roomController');
const { MIN_PLAYER_COUNT } = require('../../../config');

const disconnectingHandler = socket => {
  try {
    const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
    gameManager.leaveRoom(socket.id);
    socket.leave(gameManager.getRoomId());

    io.in(gameManager.getRoomId()).emit('sendLeftPlayer', {
      socketId: socket.id,
    });

    if (gameManager.getStatus() === 'waiting') return;
    if (gameManager.getStatus() === 'initializing') {
      if (
        !gameManager.getStreamer() ||
        gameManager.getPlayers().length < MIN_PLAYER_COUNT
      ) {
        io.in(gameManager.getRoomId()).emit('endSet', {
          scoreList: gameManager.getScoreList(),
        });
        gameManager.clearQuizSelectTimer();
        gameManager.reset();
        gameManager.resetAllPlayers();
      }
    }
    if (
      (gameManager.getStatus() === 'playing' && !gameManager.getStreamer()) ||
      gameManager.getPlayers().length < MIN_PLAYER_COUNT
    ) {
      io.in(gameManager.getRoomId()).emit('endSet', {
        scoreList: gameManager.getScoreList(),
      });
      gameManager.reset();
      gameManager.clearPlayingTimer();
      gameManager.resetAllPlayers();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = disconnectingHandler;
