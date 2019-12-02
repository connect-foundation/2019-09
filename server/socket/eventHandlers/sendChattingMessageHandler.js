const io = require('../io');
const playerController = require('../controllers/playerController');

const sendChattingMessageHandler = (socket, { nickname, message }) => {
  /**
   * 정답 검증 로직 필요
   * room.quiz === message
   *  emit('정답!')
   */
  io.in(socket.roomId).emit('sendChattingMessage', {
    nickname,
    message,
    nicknameColor: playerController.getPlayerBySocket(socket).nicknameColor,
  });
};

module.exports = sendChattingMessageHandler;
