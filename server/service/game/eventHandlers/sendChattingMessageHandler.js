const short = require('short-uuid');
const { io } = require('../../io');
const { processChatWithSystemRule } = require('../../../utils/chatUtils');
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

const sendChattingMessageToRoom = (roomId, payload) => {
  if (payload.message) {
    io.in(roomId).emit('sendChattingMessage', payload);
  }
};

const sendChattingMessageHandler = (socket, { message }) => {
  const { gameManager, timer } = roomController.getRoomByRoomId(socket.roomId);
  const roomId = gameManager.getRoomId();
  const player = gameManager.getPlayerBySocketId(socket.id);
  const playerNickname = player.getNickname();
  const playerNicknameColor = player.getNicknameColor();
  const payload = { id: short.generate() };

  if (player.getIsCorrectPlayer()) return;

  if (
    isCorrectAnswer(gameManager, message, socket.id) &&
    gameManager.getStatus() === 'playing'
  ) {
    payload.nickname = '안내';
    payload.message = `${playerNickname}님이 정답을 맞췄습니다!`;
    sendChattingMessageToRoom(roomId, payload);

    const score = player.getScore() + timer.getRemainingTime() + 50;
    player.setScore(score);
    player.setIsCorrectPlayer(true);
    io.to(socket.id).emit('correctAnswer');
    io.in(socket.roomId).emit('updateProfile', { player });

    if (gameManager.checkAllPlayersAreCorrect()) {
      gameController.repeatSet(gameManager, timer);
    }
    return;
  }

  payload.nickname = playerNickname;
  payload.nicknameColor = playerNicknameColor;
  payload.message = processChatWithSystemRule(message);
  sendChattingMessageToRoom(roomId, payload);
};

module.exports = sendChattingMessageHandler;
