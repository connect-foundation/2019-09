const short = require('short-uuid');
const { io } = require('../../io');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');

/**
 * viewer가 입력한 채팅이 정답이라면 true를 반환하는 함수
 */
const isCorrectAnswer = (gameManager, message, socketId) => {
  return (
    gameManager.getStatus() === 'playing' &&
    gameManager.getQuiz() === message &&
    !gameManager.isStreamer(socketId)
  );
};

const sendChattingMessageHandler = (socket, { nickname, message }) => {
  /**
   * 정답 검증 로직 필요
   * room.quiz === message
   *  emit('정답!')
   */
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);

  if (isCorrectAnswer(gameManager, message, socket.id)) {
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
      gameController.endSet(gameManager, timer);
    }
    return;
  }

  io.in(socket.roomId).emit('sendChattingMessage', {
    nickname,
    message,
    nicknameColor: player.getNicknameColor(),
    id: short.generate(),
  });
};

module.exports = sendChattingMessageHandler;
