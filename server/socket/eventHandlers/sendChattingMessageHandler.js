const { io } = require('../io');
const roomController = require('../controllers/roomController');

const sendChattingMessageHandler = (socket, { nickname, message }) => {
  /**
   * 정답 검증 로직 필요
   * room.quiz === message
   *  emit('정답!')
   */
  const { gameManager } = roomController.getRoomByRoomId(socket.roomId);
  const player = gameManager.getPlayerBySocketId(socket.id);
  io.in(socket.roomId).emit('sendChattingMessage', {
    nickname,
    message,
    nicknameColor: player.getNicknameColor(),
  });
};

module.exports = sendChattingMessageHandler;
