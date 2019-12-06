const short = require('short-uuid');
const { io } = require('../../io');
const roomController = require('../roomController');

const sendChattingMessageHandler = (socket, { nickname, message }) => {
  /**
   * 정답 검증 로직 필요
   * room.quiz === message
   *  emit('정답!')
   */
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);

  if (
    gameManager.getStatus() === 'playing' &&
    gameManager.getQuiz() === message &&
    !gameManager.isStreamer(socket.id)
  ) {
    io.in(socket.roomId).emit('sendChattingMessage', {
      nickname: '안내',
      message: `${nickname}님이 정답을 맞췄습니다!`,
      nicknameColor: '#000000',
      id: short.generate(),
    });
    io.to(socket.id).emit('correctAnswer');
    const score = gameManager.getRemainingPlayingTime() + 50;
    player.setScore(score);
    player.setIsCorrectPlayer(true);

    if (gameManager.checkAllPlayersAreCorrect()) {
      io.in(gameManager.getRoomId()).emit('endSet', {
        scoreList: gameManager.getScoreList(),
      });
      gameManager.reset();
      gameManager.clearPlayingTimer();
      gameManager.resetAllPlayers();
    }
  } else {
    io.in(socket.roomId).emit('sendChattingMessage', {
      nickname,
      message,
      nicknameColor: player.getNicknameColor(),
      id: short.generate(),
    });
  }
};

module.exports = sendChattingMessageHandler;
