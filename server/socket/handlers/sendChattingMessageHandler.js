const io = require('../io');

const sendChattingMessageHandler = (socket, { nickname, message }) => {
  /**
   * 정답 검증 로직 필요
   * room.quiz === message
   *  emit('정답!')
   */
  io.in(socket.roomId).emit('sendChattingMessage', { nickname, message });
};

module.exports = sendChattingMessageHandler;
