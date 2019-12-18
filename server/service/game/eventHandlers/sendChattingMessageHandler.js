const short = require('short-uuid');
const { io } = require('../../io');
const { processChatWithSystemRule } = require('../../../utils/chatUtils');
const roomController = require('../controllers/roomController');
const gameController = require('../controllers/gameController');
const GAME_STATUS = require('../../../constants/gameStatus');
const {
  SEND_CHATTING_MESSAGE,
  CORRECT_ANSWER,
  UPDATE_PROFILE,
} = require('../../../constants/event');

/**
 * viewer가 입력한 채팅이 정답이라면 true를 반환하는 함수
 */
const isCorrectAnswer = (gameManager, message, socketId) => {
  return (
    gameManager.getStatus() === GAME_STATUS.PLAYING &&
    gameManager.getQuiz() === message &&
    !gameManager.isStreamer(socketId)
  );
};

const sendChattingMessageHandler = (socket, { message }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);
  const playerNickname = player.getNickname();

  if (player.getIsCorrectPlayer()) return;

  if (
    isCorrectAnswer(gameManager, message, socket.id) &&
    gameManager.getStatus() === GAME_STATUS.PLAYING
  ) {
    io.in(socket.roomId).emit(SEND_CHATTING_MESSAGE, {
      nickname: '안내',
      message: `${playerNickname}님이 정답을 맞췄습니다!`,
      id: short.generate(),
    });

    const score = player.getScore() + timer.getRemainingTime() + 50;
    player.setScore(score);
    player.setIsCorrectPlayer(true);
    io.to(socket.id).emit(CORRECT_ANSWER);
    io.in(socket.roomId).emit(UPDATE_PROFILE, { player });

    if (gameManager.checkAllPlayersAreCorrect()) {
      gameController.repeatSet(gameManager, timer);
    }
    return;
  }

  const processedChat = processChatWithSystemRule(message);
  if (processedChat) {
    io.in(socket.roomId).emit(SEND_CHATTING_MESSAGE, {
      nickname: playerNickname,
      message: processedChat,
      nicknameColor: player.getNicknameColor(),
      id: short.generate(),
    });
  }
};

module.exports = sendChattingMessageHandler;
