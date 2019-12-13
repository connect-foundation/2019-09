const short = require('short-uuid');
const { io } = require('../../io');
const { processChatWithSystemRule } = require('../../../utils/chatUtils');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const {
  SECONDS_BETWEEN_SETS,
  SECONDS_AFTER_GAME_END,
} = require('../../../config');

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

const sendChattingMessageHandler = (socket, { message }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);
  const playerNickname = player.getNickname();

  if (isCorrectAnswer(gameManager, message, socket.id)) {
    io.in(socket.roomId).emit('sendChattingMessage', {
      nickname: '안내',
      message: `${playerNickname}님이 정답을 맞췄습니다!`,
      nicknameColor: '#000000',
      id: short.generate(),
    });
    const score = player.getScore() + timer.getRemainingTime() + 50;
    player.setScore(score);
    player.setIsCorrectPlayer(true);
    io.to(socket.id).emit('correctAnswer');
    io.in(socket.roomId).emit('updateProfileScore', { player });

    if (gameManager.checkAllPlayersAreCorrect()) {
      gameController.repeatSet(gameManager, timer);
    }
    return;
  }
  const processedChat = processChatWithSystemRule(message);
  if (processedChat) {
    io.in(socket.roomId).emit('sendChattingMessage', {
      nickname: playerNickname,
      message: processedChat,
      nicknameColor: player.getNicknameColor(),
      id: short.generate(),
    });
  }
};

module.exports = sendChattingMessageHandler;
