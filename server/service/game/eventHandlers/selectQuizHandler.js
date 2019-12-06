const roomController = require('../roomController');
const { io } = require('../../io');

const sendCurrentSecondsHandler = (currentSeconds, roomId) => {
  io.in(roomId).emit('sendCurrentSeconds', {
    currentSeconds,
  });
};

const endSetHandler = gameManager => {
  io.in(gameManager.getRoomId()).emit('endSet', {
    scoreList: gameManager.getScoreList(),
  });
  gameManager.reset();
  gameManager.clearPlayingTimer();
  gameManager.resetAllPlayers();
};

const selectQuizHandler = (socket, { quiz }) => {
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  gameManager.clearQuizSelectTimer();
  gameManager.setQuiz(quiz);
  gameManager.setStatus('playing');
  gameManager.getPlayers().forEach(player => {
    const socketId = player.getSocketId();

    io.to(socketId).emit('startSet', {
      quiz: gameManager.isStreamer(socketId) ? quiz : '',
      quizLength: quiz.length,
    });
  });

  gameManager.startPlayingTimer(sendCurrentSecondsHandler, endSetHandler);
};

module.exports = selectQuizHandler;
